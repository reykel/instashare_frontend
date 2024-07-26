import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

export default function useCategorias(){
    const categorias = ref([])
    const categoria = ref([])
    const router = useRouter()
    const errors = ref('')

    const getCategorias = async () => {

        errors.value = ''
        try{
            let response = await axios.get('categorias')
            categorias.value = response.data.categorias;
        } catch (e){
            errors.value = e.response.data
        }
    }

    const getCategoria = async (id) => {
        errors.value = ''
        try{
            let response = await axios.get('categorias/' + id)
            categoria.value = response.data.categoria;
        } catch (e){
            errors.value = e.response.data
        }
    }

    const storeCategoria = async (data) => {
        errors.value = ''
        try{
            await axios.post('categorias', data)
            await router.push({ name: 'CategoriaIndex' })
        } catch (e){
            errors.value = e.response.data
        }
    }

    const updateCategoria = async (id) => {
        errors.value = ''
        try{
            await axios.put('categorias/' + id, categoria.value)
            await router.push({ name: 'CategoriaIndex' })
        } catch (e){
            errors.value = e.response.data
        }
    }

    const destroyCategoria = async (id) => {
        await axios.delete('categorias/' + id)
    }

    return{
        categorias,
        categoria,
        errors,
        getCategorias,
        getCategoria,
        destroyCategoria,
        storeCategoria,
        updateCategoria
    }

}

