<template>
    <div>
        <div class="card">
            <Toolbar class="mb-4">
                <template #start>
                    <SplitButton label="Revoke all tokens" icon="pi pi-pause" class="p-button-rounded p-button-warning mr-2" @click="revoke_organization_tokens" :model="revoke_items"></SplitButton>                </template>
            </Toolbar>
            <DataTable ref="dt" :value="MyTokens" v-model:selection="selectedProducts" dataKey="id" 
                :paginator="true" :rows="10" :filters="filters"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" :rowsPerPageOptions="[5,10,25]"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} dataSet" responsiveLayout="scroll">
                <template #header>
                    <div class="table-header flex flex-column md:flex-row md:justiify-content-between">
						<h5 class="mb-2 md:m-0 p-as-md-center">Tokens management</h5>
						<span class="p-input-icon-left">
                            <i class="pi pi-search" />
                            <InputText v-model="filters['global'].value" placeholder="Search..." />
                        </span>
					</div>
                </template>
                <Column field="id" header="id" :sortable="true" style="min-width:8rem"></Column>
                <Column field="email" header="email" :sortable="true" style="min-width:8rem"></Column>
                <Column field="organization" header="organization" :sortable="true" style="min-width:8rem"></Column>
                <Column field="client" header="client" :sortable="true" style="min-width:4rem"></Column>
                <Column field="created_at" header="created_at" :sortable="true" style="min-width:8rem"></Column>
                <Column field="expires_at" header="expires_at" :sortable="true" style="min-width:8rem"></Column>
                <Column :exportable="false" style="min-width:12rem">
                    <template #body="slotProps">
                        <Button v-show="slotProps.data.revoked==false" icon="pi pi-pause" class="p-button-rounded p-button-warning mr-2" @click="RevokeToken(slotProps.data, 1)" />
                        <Button v-show="slotProps.data.revoked==true" icon="pi pi-sync" class="p-button-rounded p-button-success mr-2" @click="RevokeToken(slotProps.data, 0)" />
                        <Button icon="pi pi-trash" class="p-button-rounded p-button-danger mr-2" @click="DeleteToken(slotProps.data)" />
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
import useTokens from '../composables/tokens'
import { useStore } from 'vuex'


export default {
    setup() {
		const { getTokens, MyTokens, MyToken, revokeToken, destroyToken, revokeOrganizationTokens, deleteOrganizationTokens} = useTokens()

		onMounted(getTokens)

        const toast = useToast();
		const confirm = useConfirm();
        const dt = ref();
        const workDialog = ref(false);
        const store = useStore();

        const filters = ref({
            'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
        });

		const RevokeToken = (prod, int_value) => {
			confirm.require({
                message: 'Are you sure you want to ' + (int_value == 1 ? 'revoke' : 'activate') + ' this token?',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                accept: async () => {
                    MyToken.value = {...prod};
                    await revokeToken(MyToken.value.id, int_value)
                    await getTokens()
                    toast.add({severity:'success', summary:'Successful', detail:'You have successfully ' + (int_value == 1 ? 'revoked' : 'activated') + ' this token', life: 5000});
                },
            });
		}

		const DeleteToken = (prod) => {
			confirm.require({
                message: 'Are you sure you want to delete this token?',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                accept: async () => {
                    MyToken.value = {...prod};
                    await destroyToken(MyToken.value.id)
                    await getTokens()
                    toast.add({severity:'success', summary:'Successful', detail:'You have successfully revoked this token', life: 5000});
                },
            });
		}

        const revoke_items = ref([
            {
                label: 'Delete all tokens',
                icon: 'pi pi-trash',
                command: () => {
                    confirm.require({
                        message: 'Are you sure you want to deleye all the tokens in your organization?',
                        header: 'Confirmation',
                        icon: 'pi pi-exclamation-triangle',
                        accept: async () => {
                            await deleteOrganizationTokens(store.state.user.id)
                            await getTokens()
                            toast.add({severity:'success', summary:'Successful', detail:'You have successfully revoked all tokens', life: 5000});
                        },
                    });
                }
            },
            {
                label: 'Activate all tokens',
                icon: 'pi pi-sync',
                command: () => {
                    confirm.require({
                        message: 'Are you sure you want to activate all the tokens in your organization?',
                        header: 'Confirmation',
                        icon: 'pi pi-exclamation-triangle',
                        accept: async () => {
                            await revokeOrganizationTokens(store.state.user.id, 0)
                            await getTokens()
                            toast.add({severity:'success', summary:'Successful', detail:'You have successfully activated all tokens', life: 5000});
                        },
                    });
                }
            },
        ]);

        const revoke_organization_tokens = () => {
			confirm.require({
                message: 'Are you sure you want to revoke all the tokens in your organization?',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                accept: async () => {
                    await revokeOrganizationTokens(store.state.user.id, 1)
                    await getTokens()
                    toast.add({severity:'success', summary:'Successful', detail:'You have successfully revoked all tokens', life: 5000});
                },
            });
        };

        return { 
				dt, 
				workDialog, 
				MyToken, 
				filters,
				RevokeToken,
                DeleteToken,
				MyTokens,
                revoke_items,
                revoke_organization_tokens
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