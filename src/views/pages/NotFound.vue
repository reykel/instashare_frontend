<template>
    <Toast />
    <ConfirmDialog></ConfirmDialog>
    <div class="surface-0 flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
        <div class="grid justify-content-center p-2 lg:p-0" style="min-width:80%">
            <div class="col-12 mt-5 xl:mt-0 text-center">
                <img :src="'images/logo.png'" alt="Logo" class="mb-2" style="width:303px; height:92px;">
            </div>
            <div class="col-12 xl:col-6" style="border-radius:56px; padding:0.3rem; background: linear-gradient(180deg, rgba(33, 150, 243, 0.4) 10%, rgba(33, 150, 243, 0) 30%);">
                <div class="flex justify-content-center h-full w-full m-0 py-7 px-4" style="border-radius:53px; background: linear-gradient(180deg, var(--surface-50) 38.9%, var(--surface-0));">
                    <div class="grid flex-column align-items-center">
                        <span class="text-blue-500 font-bold text-3xl">404</span>
                        <h1 class="text-900 font-bold text-3xl lg:text-5xl mb-2">Looks like you are lost</h1>
                        <span class="text-gray-600">Requested resource is not available.</span>
                        <br>
                    <Button label="Salir" class="p-button p-button-danger  p-button-sm p-button-rounded m-1" icon="pi pi-times" iconPos="left" @click="logout" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { useConfirm } from "primevue/useconfirm";
import { useRouter } from "vue-router"
import { useToast } from "primevue/usetoast";
import { useStore } from 'vuex'
import axios from 'axios'

export default {
  setup() {
    const confirm = useConfirm();
	const router = useRouter();
	const store = useStore();
	const toast = useToast();

        const logout = async() =>{
            confirm.require({
                message: 'Are you sure you want to close your session?',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
					axios.get('logout')
					.then(res=>{
						if(res.data.message == 'You are successfully logged out.'){
							store.dispatch('clear_user_data')
							localStorage.clear()
							router.push({name:'Login'})
						}else{
							toast.add({severity:'error', summary:'Rejected', detail:'Error trying to logout. Please check your internet connection', life: 5000});
						}
					})
					.catch(error=>{
						toast.add({severity:'error', summary:'System error', detail:'A system error has been detected ' + error + '. Please check your internet connection', life: 5000});
					})
                },
            });
        }
    return {
      logout
    };
  },
};
</script>

