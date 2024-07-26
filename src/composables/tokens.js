import { ref } from 'vue'
import axios from 'axios'

export default function useTokens(){
    const errors = ref('')

    const MyTokens = ref([])
    const MyToken = ref({});

    const getTokens = async () => {
        errors.value = ''
        try{
            let response = await axios.get('tokens')
            MyTokens.value = response.data.tokens;
        } catch (e){
            errors.value = e.response.data
        }
    }

    const revokeToken = async (id, int_value) => {
        errors.value = ''
        try{
            const data = new FormData();
            data.append('id', id)
            data.append('int_value', int_value)
            await axios.post('revoke-token', data)
        } catch (e){
            errors.value = e.response.data
        }
    }

    const destroyToken = async (id) => {
        errors.value = ''
        try{
            const data = new FormData();
            data.append('id', id)
            await axios.post('delete-token', data)
        } catch (e){
            errors.value = e.response.data
        }
    }
    const revokeOrganizationTokens = async (id, _value) => {
        errors.value = ''
        try{
            const data = new FormData();
            data.append('id', id)
            data.append('_value', _value)
            await axios.post('revoke-organization-tokens', data)
        } catch (e){
            errors.value = e.response.data
        }
    }

    const deleteOrganizationTokens = async (id) => {
        errors.value = ''
        try{
            const data = new FormData();
            data.append('id', id)
            await axios.post('delete-organization-tokens', data)
        } catch (e){
            errors.value = e.response.data
        }
    }

    return{
        getTokens,
        MyTokens,
        MyToken,
        revokeToken,
        destroyToken,
        revokeOrganizationTokens,
        deleteOrganizationTokens
    }

}

