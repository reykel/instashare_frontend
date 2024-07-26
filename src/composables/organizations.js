import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

export default function useOrganizations(){
    const myOrganization = ref([])
    const myFiles = ref([])
    const myStates = ref([])
    const router = useRouter()
    const errors = ref('')

    const MyTeam = ref([])
    const MyPerson = ref({});
    const Organizations = ref([])
    const processing = ref()

    const getOrganizations = async () => {
        errors.value = ''
        try{
            let response = await axios.get('organization')
            Organizations.value = response.data
        } catch (e){
            errors.value = e.response.data
        }
    }

    const getMyOrganization = async () => {
        errors.value = ''
        try{
            processing.value = true
            let response = await axios.get('myorganization')
            processing.value = false
            myOrganization.value = response.data
        } catch (e){
            errors.value = e.response.data
        }
    }

    const updateMyOrganization = async () => {
        errors.value = ''
        try{
            await axios.put('organization/' + myOrganization.value.id, myOrganization.value)
            await router.push({ name: 'MyOrganization' })
        } catch (e){
            errors.value = e.response.data
        }
    }

    const destroyOrganization = async (id) => {
        errors.value = ''
        try{
            await axios.delete('organization/' + id)
        } catch (e){
            errors.value = e.response.data
        }
    }

    const revokeOrganization = async (id, int_value) => {
        errors.value = ''
        try{
            const data = new FormData();
            data.append('id', id)
            data.append('_value', int_value)
            await axios.post('revoke-organization-tokens',  data)
        } catch (e){
            errors.value = e.response.data
        }
    }

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

    const getAuthorizeds = async () => {
        errors.value = ''
        try{
            processing.value = true
            let response = await axios.get('authorized')
            processing.value = false
            MyTeam.value = response.data.authorizeds;
        } catch (e){
            errors.value = e.response.data
        }
    }

    const updateMyTeam = async (id, data) => {
        errors.value = ''
        try{
            await axios.put('authorized/' + id, data)
        } catch (e){
            errors.value = e.response.data
        }
    }
    
    const storeMyTeam = async (data) => {
        errors.value = ''
        try{
            await axios.post('authorized', data)
        } catch (e){
            errors.value = e.response.data
        }
    }

    const destroyMyTeam = async (id) => {
        await axios.delete('authorized/' + id)
    }

    return{
        getMyOrganization,
        getOrganizations,
        getAuthorizeds,
        updateMyOrganization,
        destroyOrganization,
        revokeOrganization,
        myOrganization,
        Organizations,
        myFiles,
        myStates,
        MyTeam,
        MyPerson,
        uploadFile,
        deleteFile,
        locatedFile,
        retrieveFile,
        updateMyTeam,
        storeMyTeam,
        destroyMyTeam,
        processing
    }

}

