import { ref } from 'vue'
import axios from 'axios'
//import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

export default function useProfiles(){
    const myProfile = ref([])
    //const router = useRouter()
    const errors = ref('')
    const store = useStore()

    const getMyProfile = async () => {
        errors.value = ''
        try{
            //const data = new FormData();
            //data.append('id', store.state.user.id)
            //let response = await axios.post('user', data)
            //myProfile.value = response.data
            //store.dispatch('user', myProfile.value)
            myProfile.value = store.getters.user
        } catch (e){
            errors.value = e.response.data
        }
    }

    const updateMyProfile = async () => {
        errors.value = ''
        try{
            await axios.put('user', myProfile.value)
            //await router.push({ name: 'MyProfile' })
        } catch (e){
            errors.value = e.response.data
        }
    }

    return{
        getMyProfile,
        updateMyProfile,
        myProfile
    }

}

