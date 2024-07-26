<template>
    <div class="surface-card p-4 shadow-2 border-round">
        <div class="text-3xl font-medium text-900 m-5">Edit Category</div>
            <div class="surface-section">
                <div class="container">
                    <div class="row justify-content-center">
                        <div class="col-sm-6 mt-4">
                            <p class="text-center p-error" v-if="errors"><Message severity="error"> {{ errors.message }} </Message></p> 
                            <form @submit.prevent="saveModel">
                                <div class="form-group" style="margin:3rem;">
                                    <label for="descripcion" class="block text-900 text-xl font-medium m-2">Category:</label>
                                    <InputText id="descripcion" v-model="categoria.descripcion" type="text" class="w-full mb-3" placeholder="Category name" style="padding:1rem;" />     
                                    <p class="p-error" v-for="error in errors" :key="error"> {{ error.descripcion }}</p>
                                </div>
                                <div class="form-group text-center" style="margin:3rem;">
                                    <Button type="submit" label="Accept" icon="pi pi-check" iconPos="left" />
                                    <Button label="Cancel" class="p-button-danger ml-2" icon="pi pi-times" iconPos="left" @click="$router.push({ name: 'CategoriaIndex' })" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div> 
        </div>
    </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import useCategorias from '../../composables/categorias'

const props = defineProps({
    id: {
        required: true,
        type: String
    }
})

const { categoria, getCategoria, updateCategoria, errors } = useCategorias()
const router = useRouter()

onMounted(() => {
    getCategoria(props.id)
})

const saveModel = async () => {
    await updateCategoria(props.id)
    router.push({ name: 'CategoriaIndex' })
}
</script>