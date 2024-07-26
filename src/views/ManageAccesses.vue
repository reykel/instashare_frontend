<template>
    <div>
        <div class="card">
            <DataTable ref="dt" :value="MyAccesses" v-model:selection="selectedAccesses" dataKey="id" 
                :paginator="true" :rows="10" :filters="filters"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" :rowsPerPageOptions="[5,10,25]"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} dataSet" responsiveLayout="scroll">
                <template #header>
                    <div class="table-header flex flex-column md:flex-row md:justiify-content-between">
						<h5 class="mb-2 md:m-0 p-as-md-center">Accesses management</h5>
						<span class="p-input-icon-left">
                            <i class="pi pi-search" />
                            <InputText v-model="filters['global'].value" placeholder="Search..." />
                        </span>
					</div>
                </template>
                <!-- <Column field="id" header="id" :sortable="true" style="min-width:8rem"></Column> -->
                <Column field="user_id" header="user_id" :sortable="true" style="min-width:8rem"></Column>
                <Column field="action" header="action" :sortable="true" style="min-width:8rem"></Column>
                <Column field="succeded" header="Operation" :sortable="true" dataType="boolean" style="min-width: 3rem">
                    <template #body="{ data }">
                        <i class="pi" :class="{ 'pi-check-circle text-green-500': data.succeded == 'succeded', 'pi-times-circle text-red-400': data.succeded != 'succeded' }"></i>
                    </template>
                </Column>
                <Column field="succeded" header="Description" style="min-width: 3rem"></Column>
                <Column field="ip_address" header="ip_address" :sortable="true" style="min-width:8rem"></Column>
                <Column field="user_agent" header="user_agent" :sortable="true" style="min-width:8rem"></Column>
                <Column field="organization_id" header="organization_id" :sortable="true" style="min-width:4rem"></Column>
                <Column field="created_at" header="created_at" :sortable="true" style="min-width:8rem"></Column>
            </DataTable>
        </div>
	</div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { FilterMatchMode } from 'primevue/api';
import useAccesses from '../composables/access'


export default {
    setup() {
		const { getAccesses, MyAccesses} = useAccesses()

		onMounted(getAccesses)

        const dt = ref();
        const workDialog = ref(false);
        const selectedAccesses = ref();

        const filters = ref({
            'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
        });

        return { 
				dt, 
				workDialog,
                MyAccesses,
                selectedAccesses,
				filters
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