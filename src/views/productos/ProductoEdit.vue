<template>
    <div class="surface-card p-4 shadow-2 border-round">
        <div class="text-3xl font-medium text-900 m-5">Edit Product</div>
            <div class="surface-section">
                <div class="container">
                    <div class="row justify-content-center">
                        <div class="col-sm-6 mt-4">
                            <p class="text-center p-error" v-if="errors"><Message severity="error"> {{ errors.message }} </Message></p> 
                            <form @submit.prevent="saveModel">
                                <div class="form-group" style="margin:3rem;">
                                    <label for="descripcion" class="block text-900 text-xl font-medium m-2">Description:</label>
                                    <InputText id="descripcion" v-model="producto.descripcion" type="text" class="w-full mb-3" placeholder="Description" style="padding:1rem;" />     
                                    <p class="p-error" v-for="error in errors" :key="error"> {{ error.descripcion }}</p>
                                </div>
                                <div class="form-group" style="margin:3rem;">
                                    <label for="categoria_id" class="block text-900 text-xl font-medium m-2">Category:</label>
                                    <InputText id="categoria_id" v-model="producto.categoria_id" type="hidden" class="w-full mb-3" placeholder="categoria_id" style="padding:1rem;" />  
                                    <Dropdown class="w-full mb-3" v-model="dropdownValue" :options="categorias" optionLabel="name" placeholder="Select" @change="producto.categoria_id = dropdownValue.code" />
                                    <p class="p-error" v-for="error in errors" :key="error"> {{ error.categoria_id }}</p>
                                </div>
                                <div class="form-group" style="margin:3rem;">
                                    <label for="precio" class="block text-900 text-xl font-medium m-2">Price:</label>
                                    <InputNumber id="precio" v-model="producto.precio" mode="currency" currency="USD" locale="en-US" class="w-full mb-3" />  
                                    <p class="p-error" v-for="error in errors" :key="error"> {{ error.precio }}</p>
                                </div>
                                <div class="form-group" style="margin:3rem;">
                                    <label for="um" class="block text-900 text-xl font-medium m-2">Units:</label>
                                    <InputText id="um" v-model="producto.um" type="hidden" class="w-full mb-3" placeholder="um" style="padding:1rem;" />  
                                    <Dropdown class="w-full mb-3" v-model="dropdownValueUM" :options="unidades" optionLabel="name" placeholder="Select"  @change="producto.um = dropdownValueUM.code" />
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

import { onMounted, ref } from 'vue'
import useProductos from '../../composables/productos'

export default {
    props: {
        id: {
            required: true,
            type: String
        }
    },

    setup(props) {
        const { producto, getProducto, getCategorias, updateProducto, categorias, getCategoria, categoria, codigo, unidad, codigoUM, getUnidad, errors } = useProductos()
        const dropdownValue = ref(null)
        const dropdownValueUM = ref(null)

        const unidades = ref([
					{name: 'U', code: 'U'},
					{name: 'M2', code: 'M2'},
					{name: 'M', code: 'M'},
					{name: 'Kg', code: 'Kg'},
					{name: 'Pds', code: 'Pds'}
				]);
        
        

        onMounted(
            getProducto(props.id),
            getCategorias(),
            getCategoria(props.id),
            getUnidad(props.id),
            dropdownValue.value= {name: categoria, code: codigo},
            dropdownValueUM.value= {name: unidad, code: codigoUM},
            )

        const saveModel = async () =>{
            await updateProducto(props.id)
        }

        return{
            producto,
            saveModel,
            categorias,
            getCategorias,
            dropdownValue,
            dropdownValueUM,
            unidades,
            getCategoria,
            categoria,
            codigo,
            errors

        }
    }, 
}
</script>
