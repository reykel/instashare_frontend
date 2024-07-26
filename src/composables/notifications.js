import { ref } from 'vue'
import axios from 'axios'
import { useStore } from 'vuex'

export default function useNotifications(){
    const myNotifications = ref([])
    const errors = ref('')
    const store = useStore()

    const getMyNotifications = async (data) => {
        errors.value = ''
        try{
            let response = await axios.post('list-notifications', data)
            myNotifications.value = response.data.notifications
            store.dispatch('notifications', myNotifications.value)
        } catch (e){
            errors.value = e.response.data
        }
    }

    const updateMyNotifications = async (data) => {
        errors.value = ''
        try{
            await axios.post('update-notifications', data)
        } catch (e){
            errors.value = e.response.data
        }
    }

    return{
        getMyNotifications,
        updateMyNotifications,
        myNotifications
    }

}

