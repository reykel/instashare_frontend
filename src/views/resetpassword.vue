<template>
    <div class="surface-0 flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
        <div class="grid justify-content-center p-2 lg:p-0" style="min-width:80%">
            <div class="col-12 mt-5 xl:mt-0 text-center">
                <img src="/images/logo.png" alt="logo" class="mb-2" style="width:303px; height:92px;">
            </div>
            <div class="col-12 xl:col-6" style="border-radius:56px; padding:0.3rem; background: linear-gradient(180deg, var(--primary-color), rgba(33, 150, 243, 0) 30%);">
                <div class="h-full w-full m-0 py-7 px-4" style="border-radius:53px; background: linear-gradient(180deg, var(--surface-50) 38.9%, var(--surface-0));">
                    <div class="text-center mb-5">
                        <div class="text-900 text-3xl font-medium mb-3">Type your new password please</div>
                        <div class="col-12 mt-5 text-center" v-show="processing">
                            <ProgressSpinner style="width:50px;height:50px" strokeWidth="8" fill="var(--surface-ground)" animationDuration=".5s"></ProgressSpinner>
                        </div>
                    </div>

                    <p class="text-center p-error" v-if="errors"> {{ errors.message }}</p> 
                
                    <div class="w-full md:w-10 mx-auto">
                        <form @submit.prevent="resetpassword">
                            <label for="password" class="block text-900 font-medium text-xl mb-2">Password</label>
                            <Password id="password" v-model="form.password" placeholder="Password" :toggleMask="true" class="w-full mb-3" inputClass="w-full" inputStyle="padding:1rem"></Password>
                            <p class="p-error" v-for="error in errors" :key="error"> {{ error.password }}</p>

                            <label for="password_confirmation" class="block text-900 font-medium text-xl mb-2">Password Confirmation</label>
                            <Password id="password_confirmation" v-model="form.password_confirmation" placeholder="password_confirmation" :toggleMask="true" class="w-full mb-3" inputClass="w-full" inputStyle="padding:1rem"></Password>
                            <p class="p-error" v-for="error in errors" :key="error"> {{ error.password_confirmation }}</p> 

                            <Button label="Change password" type="submit" icon="pi pi-key" class="w-full p-button-success mt-2 p-3 text-xl" :disabled="processing === true"></button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import { reactive, ref } from 'vue'
import { useRouter, useRoute } from "vue-router"

import axios from 'axios'

export default {
    setup() {
        let form = reactive({
            password: '',
            password_confirmation:'',
            email:'',
            token:''
        })
        
        const errors = ref([])
        const processing = ref()
        const router = useRouter();
        const route = useRoute();

        form.token = route.params.token.substring(6, route.params.token.length)
        form.email= route.params.email.substring(6, route.params.token.email)

        const resetpassword = async() =>{
            processing.value = true
            await axios.post('reset-password', form)
            .then(()=>{
                   router.push({name:'Login'})
            })
            .catch(error=>{
                errors.value = error.response.data
                processing.value = false
            })
        }

        return{
            form,
            resetpassword,
            errors,
            processing
        }
    },
}
</script>