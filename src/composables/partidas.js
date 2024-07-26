import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

export default function usePartidas(){
    const partidas = ref([])
    const partida = ref([])
    const router = useRouter()
    const errors = ref('')
    const productos = ref([])
    const producto = ref([])
    const codigo = ref([])

    const getPartidas = async (id) => {

        errors.value = ''
        try{
            let response = await axios.get('partidas-list/' + id)
            partidas.value = response.data.partidas;
        } catch (e){
            errors.value = e.response.data
        }
    }

    const getPartida = async (id) => {
        errors.value = ''
        try{
            let response = await axios.get('partidas/' + id)
            partida.value = response.data.partida;

        } catch (e){
            errors.value = e.response.data
        }
    }

    const storePartida = async (data) => {
        errors.value = ''
        try{
            await axios.post('partidas', data)
            await router.push({ name: 'PartidaIndex' })
        } catch (e){
            errors.value = e.response.data
        }
    }

    const updatePartida = async (id) => {
        errors.value = ''
        try{
            await axios.put('partidas/' + id, partida.value)
            await router.push({ name: 'PartidaIndex', params:{id: partida.value.oferta_id} })
        } catch (e){
            errors.value = e.response.data
        }
    }

    const destroyPartida = async (id) => {
        await axios.delete('partidas/' + id)
    }

    const getProductos = async () => {
        errors.value = ''
        try{
            let response = await axios.get('productos-list')
            productos.value = response.data;
        } catch (e){
            errors.value = e.response.data
        }
    }

    const getProducto =  async (id) => {
        errors.value = ''
        try{
            let response = await axios.get('partidas/' + id)
            producto.value = response.data.partida.producto
            codigo.value = "" + response.data.partida.producto_id + ""

        } catch (e){
            errors.value = e.response.data
        }
    }

    const getPrecios =  async (id) => {
        errors.value = ''
        try{
            let response = await axios.get('precios/' + id)
            partida.value.precio = response.data;
            partida.value.importe = partida.value.precio * partida.value.cantidad;
        } catch (e){
            errors.value = e.response.data
        }
    }

    const getPreciosNew =  async (data) => {
        errors.value = ''
        try{
            let response = await axios.get('precios/' + data.producto_id)
            data.precio = response.data;
            data.importe = data.precio * data.cantidad;
        } catch (e){
            errors.value = e.response.data
        }
    }

    /*
    const getOferta = async (id, data) => {
        errors.value = ''
        try{
            data.oferta_id = id;
        } catch (e){
            errors.value = e.response.data
        }
    }
    */

    return{
        partidas,
        productos,
        partida,
        errors,
        getPartidas,
        getPartida,
        destroyPartida,
        storePartida,
        updatePartida,
        getProductos,
        getProducto,
        getPrecios,
        getPreciosNew,
        producto,
        codigo
    }

}

