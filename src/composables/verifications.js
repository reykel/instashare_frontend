import axios from 'axios'
import { useStore } from 'vuex'
import { useRouter } from "vue-router"

export default function useVerifications(){

    const router = useRouter();
    const store = useStore();

    const update_status = async () => {
        const verification_data = new FormData();
        verification_data.append('id', store.state.user.id)

        let response = await axios.post('user', verification_data)
        await store.dispatch('user', response.data)
        await router.push({name:'Login'})
    }

    return{
        update_status
    }

}

