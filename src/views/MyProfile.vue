<template>
    <div class="surface-card p-4 shadow-2 border-round">
        <div class="text-3xl font-medium text-900 m-5">My profile</div>
        <ProgressSpinner style="width:50px;height:50px" strokeWidth="8" fill="var(--surface-ground)" animationDuration=".5s" v-show="processing"></ProgressSpinner>
        <div class="surface-section">
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-sm-6 mt-4">
                        <p class="text-center p-error" v-if="errors"><Message severity="error"> {{ errors.message }} </Message></p>
                        <form @submit.prevent="saveModel">
                            <div class="form-group" style="margin:3rem;">
                                <label for="name" class="block text-900 text-xl font-medium m-2">Name:</label>
                                <InputText id="name" v-model="myProfile.name" type="text" class="w-full mb-3" placeholder="Name" style="padding:1rem;" />
                                <p class="p-error" v-for="error in errors" :key="error"> {{ error.name }}</p>

                                <label for="email" class="block text-900 text-xl font-medium m-2">Email:</label>
                                <InputText id="email" v-model="myProfile.email" type="email" class="w-full mb-3" placeholder="Email" style="padding:1rem;" />
                                <p class="p-error" v-for="error in errors" :key="error"> {{ error.email }}</p>
                                <div class="form-group text-center" style="margin:3rem;">
                                    <Button type="submit" label="Save changes" icon="pi pi-check" iconPos="left" />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";
import axios from 'axios';
import { useStore } from 'vuex';
import useProfiles from '../composables/profiles';

export default {
    setup() {
        const processing = ref(false);
        const confirm = useConfirm();
        const toast = useToast();
        const errors = ref('');
        const store = useStore();

        const { myProfile, getMyProfile } = useProfiles();

        onMounted(getMyProfile);

        const saveModel = () => {
            errors.value = '';
            confirm.require({
                message: 'Are you sure you want to proceed to update your profile data?',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    processing.value = true;
                    axios.put('user', myProfile.value)
                        .then(res => {
                            toast.add({ severity: 'success', summary: 'Done', detail: 'You have successfully updated your profile', life: 5000 });
                            myProfile.value = res.data;
                            store.dispatch('user', myProfile.value);
                        })
                        .catch(error => {
                            errors.value = error.response.data;
                        })
                        .finally(() => {
                            processing.value = false;
                        });
                },
            });
        };

        return {
            myProfile,
            saveModel,
            processing,
            errors
        };
    },
};
</script>