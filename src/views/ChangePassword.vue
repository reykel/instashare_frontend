<template>
    <div class="surface-card p-4 shadow-2 border-round">
        <Toast />
        <div class="grid justify-content-center p-2 lg:p-0" style="min-width:80%">
            <div class="col-12 xl:col-6">
                <div class="h-full w-full m-0 py-7 px-4">
                    <div class="text-center mb-5">
                        <div class="text-900 text-3xl font-medium mb-3">Change your password</div>
                        <div class="col-12 mt-5 text-center" v-show="processing">
                            <ProgressSpinner style="width:50px;height:50px" strokeWidth="8" fill="var(--surface-ground)" animationDuration=".5s"></ProgressSpinner>
                        </div>
                    </div>
                    <div class="w-full md:w-10 mx-auto">
                        <form @submit.prevent="changing">
                            <label for="old_password" class="block text-900 font-medium text-xl mb-2">Current password</label>
                            <Password id="old_password" v-model="form.old_password" placeholder="Current password" :toggleMask="true" class="w-full mb-3" inputClass="w-full" inputStyle="padding:1rem"></Password>
                            <p class="p-error" v-for="error in errors" :key="error"> {{ error.old_password }}</p>

                            <label for="password" class="block text-900 font-medium text-xl mb-2">Password</label>
                            <Password id="password" v-model="form.password" placeholder="Password" :toggleMask="true" class="w-full mb-3" inputClass="w-full" inputStyle="padding:1rem"></Password>
                            <p class="p-error" v-for="error in errors" :key="error"> {{ error.password }}</p>

                            <label for="password_confirmation" class="block text-900 font-medium text-xl mb-2">Password Confirmation</label>
                            <Password id="password_confirmation" v-model="form.password_confirmation" placeholder="password_confirmation" :toggleMask="true" class="w-full mb-3" inputClass="w-full" inputStyle="padding:1rem"></Password>
                            <p class="p-error" v-for="error in errors" :key="error"> {{ error.password_confirmation }}</p> 
                    
                            <Button label="Change password" type="submit" icon="pi pi-plus" class="w-full p- button-success mt-2 p-3 text-xl" :disabled="processing"></button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import { reactive, ref } from 'vue'
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";

import axios from 'axios'

export default {
    setup() {
        let form = reactive({
            name: '',
            email: '',
        })
        
        const errors = ref([])
        const processing = ref()
        const confirm = useConfirm();
        const toast = useToast()

        const changing = async() =>{
            confirm.require({
                message: 'Are you sure you want to change your password?',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    processing.value = true
                    axios.put('change-password', form)
                        .then(res=>{
                            if(res.data.message == 'Password updated.'){
                                toast.add({severity:'success', summary:'Done', detail:'You have successfully changed your password', life: 5000});
                            }
                            else{
                                errors.value = res.data.errors
                            }
                            processing.value = false
                        })
                        .catch(error=>{
                            errors.value = error.response.data.errors
                            processing.value = false
                        })
                    },
                }
            );
        }

        return{
            form,
            changing,
            errors,
            processing
        }
    },
}
</script>