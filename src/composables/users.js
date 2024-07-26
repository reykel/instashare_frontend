import { ref } from 'vue'
import axios from 'axios'

export default function useUsers(){
    const errors = ref('')

    const MyUsers = ref([])
    const MyUser = ref({});
    const processing = ref()

    const getUsers = async () => {
        errors.value = ''
        try{
            processing.value = true
            let response = await axios.post('users')
            processing.value = false
            MyUsers.value = response.data;
        } catch (e){
            errors.value = e.response.data
        }
    }

    const revokeUser = async (id, int_value) => {
        errors.value = ''
        try{
            const data = new FormData();
            data.append('id', id)
            data.append('int_value', int_value)
            await axios.post('revoke-user', data)
        } catch (e){
            errors.value = e.response.data
        }
    }

    const destroyUser = async (id) => {
        errors.value = ''
        try{
            const data = new FormData();
            data.append('id', id)
            await axios.post('delete-user', data)
        } catch (e){
            errors.value = e.response.data
        }
    }

    return{
        getUsers,
        revokeUser,
        destroyUser,
        MyUsers,
        MyUser,
        processing
    }

}

