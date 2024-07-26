import { ref } from 'vue'
import axios from 'axios'

export default function useGalleries(){
    const myFiles = ref([])
    const myStates = ref([])
    const errors = ref('')

    const uploadFile = async (data, config) => {
        errors.value = ''
        try{
            await axios.post('upload', data, config)
        } catch (e){
            errors.value = e.response.data
        }
    }

    const retrieveFile = async () => {
        errors.value = ''
        try{
            let response = await axios.post('retrieve')
            myFiles.value = response.data
        } catch (e){
            errors.value = e.response.data
        }
    }

    const deleteFile = async (data, config) => {
        errors.value = ''
        try{
            await axios.post('eliminate', data, config)
        } catch (e){
            errors.value = e.response.data
        }
    }
    
    const locatedFile = async () => {
        errors.value = ''
        try{
            let response = await axios.post('located')
            myStates.value = response.data
        } catch (e){
            errors.value = e.response.data
        }
    }

    return{
        myFiles,
        myStates,
        uploadFile,
        deleteFile,
        locatedFile,
        retrieveFile
    }

}

