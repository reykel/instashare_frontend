import { ref } from 'vue'
import axios from 'axios'

export default function useAuditorias(){
    const errors = ref('')

    const MyAuditorias = ref([])
    
    const getAuditorias = async () => {
        errors.value = ''
        try{
            let response = await axios.get('list-audits')
            MyAuditorias.value = response.data.auditorias;
        } catch (e){
            errors.value = e.response.data
        }
    }

    return{
        getAuditorias,
        MyAuditorias
    }

}

