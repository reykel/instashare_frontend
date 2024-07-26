<template>
    <div class="surface-0 flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
        <div class="grid justify-content-center p-2 lg:p-0" style="min-width:80%">
            <div class="col-12 mt-5 xl:mt-0 text-center">
                <img src="/images/logo.png" alt="logo" class="mb-2" style="width:303px; height:92px;">
            </div>
            <div class="col-12 xl:col-6" style="border-radius:56px; padding:0.3rem; background: linear-gradient(180deg, var(--primary-color), rgba(33, 150, 243, 0) 30%);">
                <div class="h-full w-full m-0 py-7 px-4" style="border-radius:53px; background: linear-gradient(180deg, var(--surface-50) 38.9%, var(--surface-0));">
                    <div class="text-center mb-5">
                        <div class="col-12 mt-5 text-center" v-show="processing">
                            <ProgressSpinner style="width:50px;height:50px" strokeWidth="8" fill="var(--surface-ground)" animationDuration=".5s"></ProgressSpinner>
                        </div>
                        <div class="text-900 text-3xl font-medium mb-3" v-if="success_message">Done! Check your email please.</div>
                    </div>

                    <p class="text-center p-error" v-if="error_not">Data error. Wrong email address.</p>
                
                    <div class="w-full md:w-10 mx-auto">
                        <form @submit.prevent="forgot">
                            <label for="email" class="block text-900 text-xl font-medium mb-2">Email</label>
                            <InputText id="email" v-model="form.email" type="email" class="w-full mb-3" placeholder="Email" style="padding:1rem;" />
                            <Button label="Submit your email" type="submit" icon="pi pi-envelope" class="w-full p-3 text-xl" :disabled="processing === true"></button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive, ref } from 'vue'

import axios from 'axios'


export default {
    setup() {
        let form = reactive({
            email: '',
        })
        
        const error_not = ref('')
        const processing = ref()
        const success_message = ref('')

        const forgot = async() =>{
            processing.value = true
            await axios.post('forgot-password', form)
            .then(res=>{

                if(res.data.message == 'Check your email.'){
                    success_message.value = res.data.message
                }else{
                    error_not.value = res.data.message
                }
                processing.value = false

            })
            .catch(error=>{
                error_not.value = error
                processing.value = false
            })
        }

        return{
            form,
            forgot,
            error_not,
            success_message,
            processing
        }
    },
}
</script>