<template>
    <div>
        <div class="card">
            <DataTable ref="dt" :value="myNotifications" v-model:selection="selectedProducts" dataKey="id" 
                :paginator="true" :rows="10" :filters="filters"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" :rowsPerPageOptions="[5,10,25]"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products" responsiveLayout="scroll">
                <template #header>
                    <div class="table-header flex flex-column md:flex-row md:justiify-content-between">
                        <h3 class="mb-2 md:m-0 p-as-md-center">Manage Notifications</h3>
                        <span class="p-input-icon-left">
                            <i class="pi pi-search" />
                            <InputText v-model="filters['global'].value" placeholder="Search..." />
                        </span>
                    </div>
                </template>
            <Column field="id" header="Id"></Column>
            <Column field="title" header="Title"></Column>
            <Column field="description" header="Description"></Column>
            <Column field="created_at" header="Date"></Column>
            <!--
            <Column field="banco_cup" header="Bank"></Column>
            <Column field="no_licencia" header="License"></Column>
            -->
            <Column :exportable="false" style="min-width:8rem">
                <template #body="slotProps">
                    <Button icon="pi pi-trash" class="p-button-rounded p-button-danger mr-2" @click="deleteEjecutor(slotProps.data)" />
                </template>
            </Column>
        </DataTable>
	</div>
    </div>
</template>


<script>
    import useEjecutores from "./../composables/notifications"
    import { onMounted, ref } from "vue"
    import { FilterMatchMode } from 'primevue/api';
    import { useStore } from 'vuex'

    export default{
        setup() {
            const { getMyNotifications, myNotifications /*, destroyEjecutor, ejecutores*/ } = useEjecutores()
            //const ejecutor = ref({});
            const filters = ref({
                'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
            });
            const store = useStore();

            const data_request = new FormData();

			data_request.append('scope', store.getters.user.organization_id)
			
			if(store.getters.scopes.indexOf('system-admin') > -1 ){
				data_request.append('level', 1)
			}else if(store.getters.scopes.indexOf('tenant-admin') > -1 ){
				data_request.append('level', 2)
			}else{
				data_request.append('level', 3)
				data_request.append('scope', store.getters.user.id)
			}

			onMounted(getMyNotifications(data_request))

            return {
                filters,
                getMyNotifications,
                myNotifications
            }
            
        },
    };
    
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

.product-image {
    width: 50px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}

.p-dialog .product-image {
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