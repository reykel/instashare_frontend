<template>
    <div>
        <div class="card">
            <Toolbar class="mb-4">
                <template #start>
                    <router-link class="p-button p-button-primary" :to="{ name: 'ProductoCreate'}">
                        <i class="pi pi-plus mr-2"></i> Add new record
                    </router-link>
                </template>
            </Toolbar>
            <DataTable ref="dt" :value="productos" v-model:selection="selectedProducts" dataKey="id" 
                :paginator="true" :rows="10" :filters="filters"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" :rowsPerPageOptions="[5,10,25]"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products" responsiveLayout="scroll">
                <template #header>
                    <div class="table-header flex flex-column md:flex-row md:justify-content-between">
                        <h3 class="mb-2 md:m-0 p-as-md-center">Manage Products</h3>
                        <span class="p-input-icon-left">
                            <i class="pi pi-search" />
                            <InputText v-model="filters.global.value" placeholder="Search..." />
                        </span>
                    </div>
                </template>
                <Column field="id" header="Id"></Column>
                <Column field="descripcion" header="Description"></Column>
                <Column field="precio" header="Price" :sortable="true">
                    <template #body="slotProps">
                        {{formatCurrency(slotProps.data.precio)}}
                    </template>
                </Column>
                <Column field="um" header="Units"></Column>
                <Column field="categoria_desc" header="Category"></Column>
                <Column :exportable="false" style="min-width:8rem">
                    <template #body="slotProps">
                        <router-link class="p-button p-button-success mr-2" :to="{ name: 'ProductoEdit', params: { id: slotProps.data.id }}"><i class="pi pi-pencil"></i></router-link>
                        <router-link class="p-button p-button-primary mr-2" :to="{ name: 'ProductoGallery', params: { id: slotProps.data.id }}"><i class="pi pi-camera"></i></router-link>
                        <Button class="p-button p-button-danger mr-2" @click="deleteProducto(slotProps.data)"><i class="pi pi-trash"></i></Button>
                    </template>
                </Column>
            </DataTable>
        </div>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import useProductos from '../../composables/productos';
import { FilterMatchMode } from 'primevue/api';
import { useConfirm } from 'primevue/useconfirm';
import { useToast } from 'primevue/usetoast';

export default {
    setup() {
        const { productos, getProductos, destroyProducto } = useProductos();
        const selectedProducts = ref(null);
        const producto = ref({});
        const filters = ref({
            global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        });

        onMounted(getProductos);

        const confirm = useConfirm();
        const toast = useToast();

        const deleteProducto = (prod) => {

            confirm.require({
                message: 'Are you sure you want to proceed?',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                accept: async () => {
                    producto.value = { ...prod };
                    await destroyProducto(producto.value.id);
                    await getProductos();
                    toast.add({ severity: 'success', summary: 'Done', detail: 'You have successfully deleted this record', life: 5000 });
                },
            });
        };

        const formatCurrency = (value) => {
            return '$ ' + value;
        };

        return {
            productos,
            deleteProducto,
            filters,
            selectedProducts,
            formatCurrency,
            producto
        };
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