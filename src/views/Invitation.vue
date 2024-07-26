<template>
    <div class="surface-card p-4 shadow-2 border-round">
        <div class="grid justify-content-center p-2 lg:p-0" style="min-width:80%">
            <div class="col-12 xl:col-6">
                <div class="h-full w-full m-0 py-7 px-4">
                    <div class="text-center mb-5">
                        <div class="text-900 text-3xl font-medium mb-3">Send an invitation to a team member</div>
                        <div class="col-12 mt-5 text-center" v-show="processing">
                            <ProgressSpinner style="width:50px;height:50px" strokeWidth="8" fill="var(--surface-ground)" animationDuration=".5s"></ProgressSpinner>
                        </div>
                    </div>
                    <div class="w-full md:w-10 mx-auto">
                        <form @submit.prevent="invitation">
                            <label for="name" class="block text-900 text-xl font-medium mb-2">Name</label>
                            <InputText id="name" v-model="form.name" type="text" class="w-full mb-3" placeholder="Name" style="padding:1rem;" :disabled="processing"/>
                            <p class="p-error" v-if="errors"> {{ errors.name }}</p>

                            <label for="email" class="block text-900 text-xl font-medium mb-2">Email</label>
                            <InputText id="email" v-model="form.email" type="email" class="w-full mb-3" placeholder="Email" style="padding:1rem;" :disabled="processing"/>
                            <p class="p-error" v-if="errors"> {{ errors.email }}</p>
                    
                            <Button label="Invite a member" type="submit" icon="pi pi-plus" class="w-full p- button-success mt-2 p-3 text-xl" :disabled="processing"></button>
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

        const invitation = async() =>{
            confirm.require({
                message: 'Are you sure you want to invite to ' + form.name + ' for being part of your team?',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    processing.value = true
                    axios.post('set-invitation', form)
                        .then(res=>{

                            if(res.data.message == 'Check your email.'){
                                form.name = null
                                form.email = null
                                toast.add({severity:'success', summary:'Done', detail:'You have successfully sent your invitation', life: 5000});
                                errors.value = null
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
            invitation,
            errors,
            processing
        }
    },
}
</script>