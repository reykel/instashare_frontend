import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

export default function useProductos(){
    const productos = ref([])
    const producto = ref([])
    const router = useRouter()
    const errors = ref('')
    const categorias = ref([])
    const categoria = ref([])
    const codigo = ref([])
    const unidad = ref([])
    const codigoUM = ref([])
    

    const getProductos = async () => {

        errors.value = ''
        try{
            let response = await axios.get('producto')
            productos.value = response.data.productos;
        } catch (e){
            errors.value = e.response.data
        }
    }

    const getProducto = async (id) => {
        errors.value = ''
        try{
            let response = await axios.get('producto/' + id)
            producto.value = response.data.producto;

        } catch (e){
            errors.value = e.response.data
        }
    }

    const storeProducto = async (data) => {
        errors.value = ''
        try{
            await axios.post('producto', data)
            await router.push({ name: 'ProductoIndex' })
        } catch (e){
            errors.value = e.response.data
        }
    }

    const updateProducto = async (id) => {
        errors.value = ''
        try{
            await axios.put('producto/' + id, producto.value)
            await router.push({ name: 'ProductoIndex' })
        } catch (e){
            errors.value = e.response.data
        }
    }

    const destroyProducto = async (id) => {
        await axios.delete('producto/' + id)
    }

    const getCategorias = async () => {

        errors.value = ''
        try{
            let response = await axios.get('categorias-list')
            categorias.value = response.data;
        } catch (e){
            errors.value = e.response.data
        }
    }

    const getCategoria =  async (id) => {
        errors.value = ''
        let cat_code = null
        let nombre = null

        try{
            let response = await axios.get('producto/' + id)
            producto.value = response.data.producto;

            cat_code = "" + producto.value.categoria_id + ""
            nombre = producto.value.categoria_desc

            categoria.value = nombre
            codigo.value = cat_code

        } catch (e){
            errors.value = e.response.data
        }
    }

    const getUnidad =  async (id) => {
        errors.value = ''
        let cat_code = null
        let nombre = null

        try{
            let response = await axios.get('producto/' + id)
            producto.value = response.data.producto;

            cat_code = producto.value.um
            nombre = producto.value.um

            unidad.value = nombre
            codigoUM.value = cat_code

        } catch (e){
            errors.value = e.response.data
        }
    }

    return{
        productos,
        categorias,
        producto,
        errors,
        getProductos,
        getProducto,
        destroyProducto,
        storeProducto,
        updateProducto,
        getCategorias,
        getCategoria,
        categoria,
        codigo,
        unidad,
        codigoUM,
        getUnidad
    }

}

