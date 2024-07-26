<template>
    <div>
        <div class="card">
                    <div class="text-center mb-5">
                        <div class="col-12 mt-5 text-center" v-show="processing">
                            <ProgressSpinner style="width:50px;height:50px" strokeWidth="8" fill="var(--surface-ground)" animationDuration=".5s"></ProgressSpinner>
                        </div>
                    </div>
            <DataTable ref="dt" :value="MyUsers" v-model:selection="selectedProducts" dataKey="id" 
                :paginator="true" :rows="10" :filters="filters"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" :rowsPerPageOptions="[5,10,25]"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} dataSet" responsiveLayout="scroll">
                <template #header>
                    <div class="table-header flex flex-column md:flex-row md:justiify-content-between">
						<h5 class="mb-2 md:m-0 p-as-md-center">Users management</h5>
						<span class="p-input-icon-left">
                            <i class="pi pi-search" />
                            <InputText v-model="filters['global'].value" placeholder="Search..." />
                        </span>
					</div>
                </template>
                <Column field="id" header="id" :sortable="true" style="min-width:1rem"></Column>
                <Column field="name" header="name" :sortable="true" style="min-width:8rem"></Column>
                <Column field="email" header="email" :sortable="true" style="min-width:8rem"></Column>
                <Column field="organizations.name" header="organization" :sortable="true" style="min-width:8rem"></Column>
                <Column field="scopes.roles.role" header="role" :sortable="true" style="min-width:8rem"></Column>
                <Column field="is_active" header="status" :sortable="true" style="min-width:2rem"></Column>
                <Column field="created_at" header="creation date" :sortable="true" style="min-width:8rem"></Column>
                <Column :exportable="false" style="min-width:12rem">
                    <template #body="slotProps">
                        <Button v-show="slotProps.data.is_active=='Active'" icon="pi pi-pause" class="p-button-rounded p-button-warning mr-2" @click="RevokeAccount(slotProps.data, 1)" />
                        <Button v-show="slotProps.data.is_active=='Inactive'" icon="pi pi-sync" class="p-button-rounded p-button-success mr-2" @click="RevokeAccount(slotProps.data, 0)" />
                        <Button icon="pi pi-trash" class="p-button-rounded p-button-danger mr-2" @click="DeleteAccount(slotProps.data)" />
                    </template>
                </Column>
            </DataTable>
        </div>
	</div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { FilterMatchMode } from 'primevue/api';
import { useToast } from 'primevue/usetoast';
import { useConfirm } from "primevue/useconfirm";
import useUsers from '../composables/users'


export default {
    setup() {
		const { getUsers, MyUsers, MyUser, destroyUser, revokeUser, processing } = useUsers()

		onMounted(getUsers)

        const toast = useToast();
		const confirm = useConfirm();

        const filters = ref({
            'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
        });

		const RevokeAccount = (prod, int_value) => {
			confirm.require({
                message: 'Are you sure you want to  ' + (int_value == 1 ? 'revoke' : 'activate') + '  this account?',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                accept: async () => {
                    MyUser.value = {...prod};
                    await revokeUser(MyUser.value.id, int_value)
                    await getUsers()
                    toast.add({severity:'success', summary:'Successful', detail:'You have successfully ' + (int_value == 1 ? 'revoked' : 'activated') + '  this account', life: 5000});
                },
            });
		}

		const DeleteAccount = (prod) => {
			confirm.require({
                message: 'Are you sure you want to delete this account?',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                accept: async () => {
                    MyUser.value = {...prod};
                    await destroyUser(MyUser.value.id)
                    await getUsers()
                    toast.add({severity:'success', summary:'Successful', detail:'You have successfully deleted this account', life: 5000});
                },
            });
		}

        return { 
            MyUsers,
            filters, 
            RevokeAccount,
            DeleteAccount,
            MyUser,
            processing
		}
    }
}
</script>

<style lang="scss" scoped>
.table-header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    @media screen and (max-width: 960px) {
        align-items: start;
	}
}

.MyToken-image {
    width: 50px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}

.p-dialog .MyToken-image {
    width: 50px;
    margin: 0 auto 2rem auto;
    display: block;
}

.confirmation-content {
    display: flex;
    align-items: center;
    justify-content: center;
}
@media screen and (max-width: 960px) {
	::v-deep(.p-toolbar) {
		flex-wrap: wrap;
        
		.p-button {
            margin-bottom: 0.25rem;
        }
	}
}
</style>