<template>
    <div class="surface-card p-4 shadow-2 border-round">
        <div class="text-3xl font-medium text-900 m-5">Add a new Product</div>
        <div class="surface-section">
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-sm-6 mt-4">
                        <p class="text-center p-error" v-if="errors"> <Message severity="error"> {{ errors.message }} </Message></p> 
                        <form @submit.prevent="saveModel">
                            <div class="form-group" style="margin:3rem;">
                                <label for="descripcion" class="block text-900 text-xl font-medium m-2">Description:</label>
                                <InputText id="descripcion" v-model="form.descripcion" type="text" class="w-full mb-3" placeholder="Description" style="padding:1rem;" />     
                                <p class="p-error" v-for="error in errors" :key="error"> {{ error.descripcion }}</p>
                            </div>
                            <div class="form-group" style="margin:3rem;">
                                <label for="categoria_id" class="block text-900 text-xl font-medium m-2">Category:</label>
                                <InputText id="categoria_id" v-model="form.categoria_id" type="hidden" class="w-full mb-3" placeholder="categoria_id" style="padding:1rem;" />  
                                <Dropdown class="w-full mb-3" v-model="dropdownValue" :options="categorias" optionLabel="name" placeholder="Select" @change="form.categoria_id = dropdownValue.code" />
                                <p class="p-error" v-for="error in errors" :key="error"> {{ error.categoria_id }}</p>
                            </div>
                            <div class="form-group" style="margin:3rem;">
                                <label for="precio" class="block text-900 text-xl font-medium m-2">Price:</label>
                                <InputNumber id="precio" v-model="form.precio" mode="currency" currency="USD" locale="en-US" class="w-full mb-3" />  
                                <p class="p-error" v-for="error in errors" :key="error"> {{ error.precio }}</p>
                            </div>
                            <div class="form-group" style="margin:3rem;">
                                <label for="um" class="block text-900 text-xl font-medium m-2">Units:</label>
                                <InputText id="um" v-model="form.um" type="hidden" class="w-full mb-3" placeholder="um" style="padding:1rem;" />  
                                <Dropdown class="w-full mb-3" v-model="dropdownValueUM" :options="unidades" optionLabel="name" placeholder="Select"  @change="form.um = dropdownValueUM.code" />
                                <p class="p-error" v-for="error in errors" :key="error"> {{ error.um }}</p>
                            </div>
                            <div class="form-group text-center" style="margin:3rem;">
                                <Button type="submit" label="Acept" icon="pi pi-check" iconPos="left" />
                                <Button label="Cancel" class="p-button-danger ml-2" icon="pi pi-times" iconPos="left" @click="$router.push({ name: 'ProductoIndex' })" />
                            </div>
                        </form>
                    </div>
                </div>
            </div> 
        </div>
    </div>
</template>

<script>
import { onMounted, reactive, ref } from 'vue';
import useProductos from '../../composables/productos';

export default {
    setup() {
        const form = reactive({
            descripcion: '',
            categoria_id: '',
            precio: '',
            um: '',
        });

        const { storeProducto, getCategorias, categorias, errors } = useProductos();
        const dropdownValue = ref(null);
        const dropdownValueUM = ref(null);

        const unidades = ref([
            { name: 'U', code: 'U' },
            { name: 'M2', code: 'M2' },
            { name: 'M', code: 'M' },
            { name: 'Kg', code: 'Kg' },
            { name: 'Pds', code: 'Pds' }
        ]);

        onMounted(() => {
            getCategorias();
        });

        const saveModel = async () => {
            await storeProducto({ ...form });
        };

        return {
            form,
            saveModel,
            dropdownValue,
            dropdownValueUM,
            unidades,
            categorias,
            errors
        };
    }
};
</script>

<style scoped>
.surface-card {
    padding: 2rem;
    border-radius: 0.5rem;
    box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
}

.text-3xl {
    font-size: 1.875rem;
    line-height: 2.25rem;
}

.font-medium {
    font-weight: 500;
}

.text-900 {
    color: #212529;
}

.p-4 {
    padding: 1rem;
}

.shadow-2 {
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
}

.border-round {
    border-radius: 0.25rem;
}

.container {
    max-width: 100%;
    margin: 0 auto;
    padding: 0 1rem;
}

.row {
    display: flex;
    flex-wrap: wrap;
    margin-right: -0.5rem;
    margin-left: -0.5rem;
}

.col-sm-6 {
    flex: 0 0 auto;
    width: 50%;
    max-width: 50%;
}

.mt-4 {
    margin-top: 1.5rem;
}

.text-center {
    text-align: center;
}

.p-error {
    color: #f44336;
    margin-top: 0.25rem;
    font-size: 0.875rem;
}

.w-full {
    width: 100%;
}

.mb-3 {
    margin-bottom: 1rem;
}

.form-group {
    margin: 3rem;
}

.block {
    display: block;
}

.text-xl {
    font-size: 1.25rem;
    line-height: 1.75rem;
}

.font-medium {
    font-weight: 500;
}

.m-2 {
    margin: 0.5rem;
}

.text-900 {
    color: #212529;
}

.p-button-danger {
    background-color: #dc3545;
    border-color: #dc3545;
    color: #fff;
}

.ml-2 {
    margin-left: 0.5rem;
}
</style>