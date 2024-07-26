<template>
    <Toast />
    <ConfirmDialog />
    <div class="layout-topbar">
        <router-link to="/" class="layout-topbar-logo">
            <img alt="Logo" src="/images/logo.png" style="width:151px; height:46px;" />
        </router-link>
        <button class="p-link layout-menu-button layout-topbar-button" @click="onMenuToggle">
            <i class="pi pi-bars"></i>
        </button>

        <button class="p-link layout-topbar-menu-button layout-topbar-button"
            v-styleclass="{ selector: '@next', enterClass: 'hidden', enterActiveClass: 'scalein', 
            leaveToClass: 'hidden', leaveActiveClass: 'fadeout', hideOnOutsideClick: true}">
            <i class="pi pi-ellipsis-v"></i>
        </button>
        <ul class="layout-topbar-menu hidden lg:flex origin-top">
            <li>
                <button class="p-link layout-topbar-button" @click="toggle">
                    <i class="pi pi-user"></i>
                    <span>Settings</span>
                    <Menu ref="menu" id="overlay_menu" :model="items" :popup="true" />
                </button>
            </li>
        </ul>
    </div>
</template>

<script>
import { useConfirm } from "primevue/useconfirm";
import { useRouter } from "vue-router";
import { useStore } from 'vuex';
import { useToast } from "primevue/usetoast";
import { ref } from "vue";
import axios from 'axios';
import { useLayout } from '../layout/composables/layout';

export default {
    setup(props, context) {
        const { onMenuToggle } = useLayout();
        const confirm = useConfirm();
        const router = useRouter();
        const store = useStore();
        const toast = useToast();
        const menu = ref(null);

        const logout = async () => {
            confirm.require({
                message: 'Are you sure you want to close your session?',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    axios.get('logout')
                        .then(res => {
                            if (res.data.message === 'You are successfully logged out.') {
                                store.dispatch('clear_user_data');
                                localStorage.clear();
                                router.push({ name: 'Login' });
                            } else {
                                toast.add({ severity: 'error', summary: 'Rejected', detail: 'Error trying to logout. Please check your internet connection', life: 5000 });
                            }
                        })
                        .catch(error => {
                            toast.add({ severity: 'error', summary: 'System error', detail: 'A system error has been detected ' + error + '. Please check your internet connection', life: 5000 });
                        });
                },
            });
        };

        const onTopbarMenuToggle = (event) => {
            context.emit('topbar-menu-toggle', event.target.value);
        };

        const toggle = (event) => {
            menu.value.toggle(event);
        };

        const navigateTo = (route) => {
            router.push(route);
        };

        const items = [
            {
                label: 'Profile admin',
                items: [
                    {
                        label: 'My profile',
                        icon: 'pi pi-fw pi-id-card',
                        command: () => navigateTo('/myprofile')
                    },
                    {
                        label: 'Change Password',
                        icon: 'pi pi-fw pi-lock',
                        command: () => navigateTo('/change-password')
                    },
                    {
                        label: 'Logout',
                        icon: 'pi pi-fw pi-sign-out',
                        command: () => logout()
                    }
                ]
            }
        ];

        return {
            logout,
            onMenuToggle,
            onTopbarMenuToggle,
            items,
            toggle,
            menu
        };
    },
};
</script>