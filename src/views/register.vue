<template>
    <div class="surface-0 flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
        <div class="grid justify-content-center p-2 lg:p-0" style="min-width:80%">
            <div class="col-12 mt-5 xl:mt-0 text-center">
                <img src="/images/logo.png" alt="logo" class="mb-2" style="width:303px; height:92px;">
            </div>
            <div class="col-12 xl:col-6" style="border-radius:56px; padding:0.3rem; background: linear-gradient(180deg, var(--primary-color), rgba(33, 150, 243, 0) 30%);">
                <div class="h-full w-full m-0 py-7 px-4" style="border-radius:53px; background: linear-gradient(180deg, var(--surface-50) 38.9%, var(--surface-0));">
                    <div class="text-center mb-5">
                        <div class="text-900 text-3xl font-medium mb-3">Welcome for the first time!</div>
                        <div class="col-12 mt-5 text-center" v-show="processing">
                            <ProgressSpinner style="width:50px;height:50px" strokeWidth="8" fill="var(--surface-ground)" animationDuration=".5s"></ProgressSpinner>
                        </div>
                    </div>

                    <p class="text-center p-error" v-if="errors"> {{ errors.message }}</p> 
                
                    <div class="w-full md:w-10 mx-auto">
                        <form @submit.prevent="register">
                            <label for="name" class="block text-900 text-xl font-medium mb-2">Name</label>
                            <InputText id="name" v-model="form.name" type="text" class="w-full mb-3" placeholder="Name" style="padding:1rem;" />
                            <p class="p-error" v-for="error in errors" :key="error"> {{ error.name }}</p>

                            <label for="email" class="block text-900 text-xl font-medium mb-2">Email</label>
                            <InputText id="email" v-model="form.email" type="email" class="w-full mb-3" placeholder="Email" style="padding:1rem;" />
                            <p class="p-error" v-for="error in errors" :key="error"> {{ error.email }}</p>
                    
                            <label for="password" class="block text-900 font-medium text-xl mb-2">Password</label>
                            <Password id="password" v-model="form.password" placeholder="Password" :toggleMask="true" class="w-full mb-3" inputClass="w-full" inputStyle="padding:1rem"></Password>
                            <p class="p-error" v-for="error in errors" :key="error"> {{ error.password }}</p>

                            <label for="password_confirmation" class="block text-900 font-medium text-xl mb-2">Password Confirmation</label>
                            <Password id="password_confirmation" v-model="form.password_confirmation" placeholder="password_confirmation" :toggleMask="true" class="w-full mb-3" inputClass="w-full" inputStyle="padding:1rem"></Password>
                            <p class="p-error" v-for="error in errors" :key="error"> {{ error.password_confirmation }}</p> 

                            <Button label="Sign Up" type="submit" icon="pi pi-plus" class="w-full p-button-success mt-2 p-3 text-xl" :disabled="processing === true"></button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import { reactive, ref } from 'vue'
import { useRouter } from "vue-router"
import { useStore } from 'vuex'

import axios from 'axios'

export default {
    setup() {
        let form = reactive({
            name: '',
            email: '',
            password: '',
            password_confirmation:''
        })
        
        const errors = ref([])
        const processing = ref()
        const router = useRouter();
        const store = useStore();

        const register = async() =>{
            processing.value = true
            await axios.post('register', form)
            .then(res=>{

                if(res.data.message == 'success'){
                   
                    store.dispatch('token', res.data.token)
                    store.dispatch('refresh_token', res.data.refresh_token)
                    
                    store.dispatch('user', res.data.user)
                    store.dispatch('scopes', res.data.scopes)

                    router.push({name:'dashboard'})
                }
                processing.value = false
                form.password = null
                form.password_confirmation = null
            })
            .catch(error=>{
                errors.value = error.response.data
                processing.value = false
                form.password = null
                form.password_confirmation = null
            })
        }

        return{
            form,
            register,
            errors,
            processing
        }
    },
}
</script>