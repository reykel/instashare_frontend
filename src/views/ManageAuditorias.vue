<template>
    <div>
        <div class="card">
            <DataTable ref="dt" :value="MyAuditorias" v-model:selection="selectedAuditorias" dataKey="id" 
                :paginator="true" :rows="10" :filters="filters"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" :rowsPerPageOptions="[5,10,25]"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} dataSet" responsiveLayout="scroll">
                <template #header>
                    <div class="table-header flex flex-column md:flex-row md:justiify-content-between">
						<h5 class="mb-2 md:m-0 p-as-md-center">Auditorías management</h5>
						<span class="p-input-icon-left">
                            <i class="pi pi-search" />
                            <InputText v-model="filters['global'].value" placeholder="Search..." />
                        </span>
					</div>
                </template>
                <!-- <Column field="id" header="id" :sortable="true" style="min-width:8rem"></Column> -->
                <Column field="user_id" header="user_id" :sortable="true" style="min-width:8rem"></Column>
                <Column header="event">
                    <template #body="slotProps">
                        <Tag :value="slotProps.data.event" :severity="getSeverity(slotProps.data)" />
                    </template>
                </Column>
                <Column field="ip_address" header="ip_address" :sortable="true" style="min-width:8rem"></Column>
                <Column field="user_agent" header="user_agent" :sortable="true" style="min-width:8rem"></Column>
                <Column field="organization_id" header="organization_id" :sortable="true" style="min-width:4rem"></Column>
                <Column field="created_at" header="created_at" :sortable="true" style="min-width:8rem"></Column>
                <Column :exportable="false" style="min-width:8rem">
                    <template #body="slotProps">
                            <Button icon="pi pi-book" class="p-button-rounded p-button-default mr-2" @click="editAuditory(slotProps.data, 1)" />
<!--                        <Button icon="pi pi-trash" outlined rounded severity="danger" @click="confirmDeleteAuditory(slotProps.data)" /> -->
                    </template>
                </Column>
            </DataTable>
            <Dialog v-model:visible="auditoryDialog" :style="{width: '450px'}" header="Auditory Details" :modal="true" class="p-fluid">
                <div class="field"  v-show="auditory.event=='UPDATED' || auditory.event=='DELETED'" >
                    <label for="description">Valores previos</label>
                    <Textarea id="old_values" v-model="auditory.old_values" rows="5" cols="20" />                
                </div>
                <div class="field"  v-show="auditory.event!=='DELETED'">
                    <label for="description">Valor de los campos</label>
                    <Textarea id="new_values" v-model="auditory.new_values" rows="5" cols="20" />
                </div>

                <template #footer>
                    <Button label="Cerrar" icon="pi pi-times" text @click="hideDialog"/>
                </template>
            </Dialog>

        </div>
	</div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { FilterMatchMode } from 'primevue/api';
import useAuditorias from '../composables/auditorias'


export default {
    setup() {
		const { getAuditorias, MyAuditorias} = useAuditorias()

		onMounted(getAuditorias)

        const dt = ref();
        const workDialog = ref(false);
        const selectedAuditorias = ref();
        const auditoryDialog = ref(false);
        const auditory = ref();

        const filters = ref({
            'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
        });

        const editAuditory = (prod) => {
            auditory.value = {...prod};
            auditoryDialog.value = true;
        };

        const hideDialog = () => {
            auditoryDialog.value = false;
        };
        const getSeverity = (aufits) => {
            switch (aufits.event) {
                case 'CREATED':
                    return 'success';

                case 'UPDATED':
                    return 'warning';

                case 'DELETED':
                    return 'danger';

                default:
                    return null;
            }
        };

        return { 
				dt, 
				workDialog,
                MyAuditorias,
                selectedAuditorias,
                getSeverity,
                editAuditory,
                hideDialog,
                auditory,
                auditoryDialog,
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