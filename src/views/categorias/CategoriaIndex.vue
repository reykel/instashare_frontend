<template>
    <div>
        <div class="card">
            <Toolbar class="mb-4">
                <template #start>
                    <router-link class="p-button p-button-primary mr-2" :to="{ name: 'CategoriaCreate'}">
                        <i class="pi pi-plus  mr-2"></i>  Add new record
                    </router-link>
                </template>
            </Toolbar>
            <DataTable ref="dt" :value="categorias" v-model:selection="selectedProducts" dataKey="id" 
                    :paginator="true" :rows="10" :filters="filters"
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" :rowsPerPageOptions="[5,10,25]"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products" responsiveLayout="scroll">
                    <template #header>
                        <div class="table-header flex flex-column md:flex-row md:justiify-content-between">
                            <h3 class="mb-2 md:m-0 p-as-md-center">Manage Categorías</h3>
                            <span class="p-input-icon-left">
                                <i class="pi pi-search" />
                                <InputText v-model="filters['global'].value" placeholder="Search..." />
                            </span>
                        </div>
                    </template>
                <Column field="id" header="Id"></Column>
                <Column field="descripcion" header="Category"></Column>
                <Column :exportable="false" style="min-width:8rem">
                    <template #body="slotProps">
                        <router-link class="p-button p-button-success mr-2" :to="{ name: 'CategoriaEdit', params: { id: slotProps.data.id }}"><i class="pi pi-pencil"></i></router-link>
                        <Button class="p-button p-button-danger" @click="deleteCategoria(slotProps.data)"><i class="pi pi-trash"></i></Button>
                    </template>
                </Column>
            </DataTable>
	</div>
    </div>
</template>


<script>
    import useCategorias from "../../composables/categorias"
    import { onMounted, ref } from "vue"
    import { FilterMatchMode } from 'primevue/api';
    import { useConfirm } from "primevue/useconfirm";
    import { useToast } from "primevue/usetoast";

    export default {
        setup() {
            const { categorias, getCategorias, destroyCategoria } = useCategorias()
            const selectedProducts = ref();
            const categoria = ref({});
            const filters = ref({
                'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
            });


            onMounted(getCategorias)
            const confirm = useConfirm();
            const toast = useToast();

            const deleteCategoria = (prod) => {

                confirm.require({
                    message: 'Are you sure you want to proceed?',
                    header: 'Confirmation',
                    icon: 'pi pi-exclamation-triangle',
                    accept: async() => {
                        categoria.value = {...prod};
                        await destroyCategoria(categoria.value.id)
                        await getCategorias()
                        toast.add({severity:'success', summary:'Done', detail:'You have successfully deleted this record', life: 5000});
                    },
                });
            }

            return {
                categorias,
                deleteCategoria,
                filters,
                selectedProducts,
                categoria
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