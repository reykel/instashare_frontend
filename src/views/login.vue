<template>
    <div class="surface-0 flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
        <div class="grid justify-content-center p-2 lg:p-0" style="min-width:80%">
            <div class="col-12 mt-5 xl:mt-0 text-center">
                <img :src="'images/logo.png'" alt="Logo" class="mb-2" style="width:303px; height:92px;">
            </div>
            <div class="col-12 xl:col-6" style="border-radius:56px; padding:0.3rem; background: linear-gradient(180deg, var(--primary-color), rgba(33, 150, 243, 0) 30%);">
                <div class="h-full w-full m-0 py-7 px-4" style="border-radius:53px; background: linear-gradient(180deg, var(--surface-50) 38.9%, var(--surface-0));">
                    <div class="text-center mb-5">
                        <div class="text-900 text-3xl font-medium mb-3">Welcome, visitor!</div>
                        <span class="text-600 font-medium line-height-3">Don't have an account?</span>
                        <a class="font-medium no-underline ml-2 text-blue-500 cursor-pointer" href="/register/">Create one today!</a>

                        <div class="col-12 mt-5 text-center" v-show="processing">
                            <ProgressSpinner style="width:50px;height:50px" strokeWidth="8" fill="var(--surface-ground)" animationDuration=".5s"></ProgressSpinner>
                        </div>
                    </div>

                    <p class="text-center p-error" v-if="error_not">Credentials error. Check your email and password please.</p>
                
                    <div class="w-full md:w-10 mx-auto">
                        <form @submit.prevent="login">
                            <label for="email" class="block text-900 text-xl font-medium mb-2">Email</label>
                            <InputText id="email" v-model="form.email" type="email" class="w-full mb-3" placeholder="Email" style="padding:1rem;" />
                    
                            <label for="password" class="block text-900 font-medium text-xl mb-2">Password</label>
                            <Password id="password" v-model="form.password" placeholder="Password" :toggleMask="true" class="w-full mb-3" inputClass="w-full" inputStyle="padding:1rem"></Password>
                    
                            <div class="flex align-items-center justify-content-between mb-5">
                                <router-link class="font-medium no-underline ml-2 text-right cursor-pointer" style="color: var(--primary-color)" :to="{name :'Forgot'}">Forgot password?</router-link>
                            </div>
                            <Button label="Sign In" type="submit" icon="pi pi-user" class="w-full p-3 text-xl" :disabled="processing === true"></button>
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
            email: '',
            password: '',
            checked: false
        })
        
        const error_not = ref('')
        const processing = ref()
        const router = useRouter();
        const store = useStore();

        const login = async() =>{
            processing.value = true
            await axios.post('login', form)
            .then(res=>{

                if(res.data.message == 'success'){
                    
                    store.dispatch('token', res.data.token)
                    store.dispatch('refresh_token', res.data.refresh_token)
                    
                    store.dispatch('user', res.data.user)
                    store.dispatch('scopes', res.data.scopes)

                    // store.getters.redirect.length == 1 || 

                    if(store.getters.redirect == null){
                        if(store.getters.scopes == "outter-client")
                            router.push({name:'notfound'})
                        else
                            router.push({name:'dashboard'})
                    }else{
                        router.push(store.getters.redirect)
                        store.dispatch('redirect', null)
                    }
                }else{
                    error_not.value = res.data.message
                    form.email = null
                    form.password = null
                }
                processing.value = false
            })
            .catch(error=>{
                error_not.value = error
                form.email = null
                form.password = null
                processing.value = false
            })
        }

        return{
            form,
            login,
            error_not,
            processing
        }
    },
}
</script>

<style scoped>
.pi-eye {
    transform:scale(1.6);
    margin-right: 1rem;
}

.pi-eye-slash {
    transform:scale(1.6);
    margin-right: 1rem;
}
</style>