
<script setup>
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useToast } from 'primevue/usetoast';
import useNotifications from '../composables/notifications';
import Pusher from 'pusher-js';
import axios from 'axios';

defineProps({
    simple: {
        type: Boolean,
        default: false
    }
});

const active = ref(false);
const active_bell = ref(false);

const { getMyNotifications, updateMyNotifications, myNotifications } = useNotifications();
const store = useStore();
const toast = useToast();

const PUSHER_APP_KEY = 'da825e3784afe1d3db39';

const data_request = new FormData();

const visible = ref(false);

data_request.append('scope', store.getters.user.organization_id);

if (store.getters.scopes.indexOf('system-admin') > -1) {
    data_request.append('level', 1);
} else if (store.getters.scopes.indexOf('tenant-admin') > -1) {
    data_request.append('level', 2);
} else {
    data_request.append('level', 3);
    data_request.append('scope', store.getters.user.id);
}

onMounted(() => {
    getMyNotifications(data_request);
});

Pusher.logToConsole = false;

const pusher = new Pusher(PUSHER_APP_KEY, {
    cluster: 'us2',
    forceTLS: true,
    authEndpoint: process.env.NODE_ENV === 'production' ? 'https://pulpafruit.store/api/broadcasting/auth' : 'http://api.instashare.local/api/broadcasting/auth',
    auth: {
        headers: {
            Authorization: 'Bearer ' + store.getters.token,
        },
    },
});

if (store.getters.scopes.indexOf('system-admin') > -1) {
    const system_channel = pusher.subscribe('private-root-channel');

    system_channel.bind('pusher:subscription_succeeded', () => {
        system_channel.bind('user-invitation-acepted', async (data) => {
            toast.add({ severity: 'success', summary: 'User accepted the invitation', detail: 'The user ' + data.user.email + ' has accepted the invitation', life: 5000 });
            await getMyNotifications(data_request);
        });

        system_channel.bind('user-added', async (data) => {
            toast.add({ severity: 'info', summary: 'New user added', detail: 'The user ' + data.user.email + ' has been registered', life: 5000 });
            await getMyNotifications(data_request);
        });

        system_channel.bind('user-invited', async (data) => {
            toast.add({ severity: 'info', summary: 'New user invited', detail: 'The user ' + data.user.email + ' has been invited', life: 5000 });
            await getMyNotifications(data_request);
        });

        system_channel.bind('user-email-verified', async (data) => {
            toast.add({ severity: 'info', summary: 'User email verified', detail: 'The email ' + data.user.email + ' has been verified', life: 5000 });
            await getMyNotifications(data_request);
        });
    });
}

if (store.getters.scopes.indexOf('tenant-admin') > -1) {
    const tenant_channel = pusher.subscribe('private-tenant-channel.' + store.getters.user.organization_id);

    tenant_channel.bind('pusher:subscription_succeeded', () => {
        tenant_channel.bind('member-invitation-acepted', async (data) => {
            toast.add({ severity: 'success', summary: 'Member accepted the invitation', detail: 'The member ' + data.user.email + ' has accepted the invitation', life: 5000 });
            await getMyNotifications(data_request);
        });

        tenant_channel.bind('member-email-verified', async (data) => {
            const verification_data = new FormData();
            verification_data.append('id', store.state.user.id);

            const response = await axios.post('user', verification_data);
            await store.dispatch('user', response.data);
            toast.add({ severity: 'success', summary: 'Email verified', detail: 'Your email ' + data.user.email + ' has been successfully verified.', life: 5000 });
            await getMyNotifications(data_request);
        });

        tenant_channel.bind('oferta-enviada', async () => {
            await getMyNotifications(data_request);
        });

        tenant_channel.bind('oferta-aceptada', async () => {
            toast.add({ severity: 'success', summary: 'Offer accepted', life: 5000 });
            await getMyNotifications(data_request);
        });
    });
}

/*
const toggleConfigurator = () => {
    active.value = !active.value;
    if (active.value && active_bell.value) {
        unbadgeNotifications();
    }
};
*/
const onConfigButtonClick = () => {
    visible.value = !visible.value;
	active.value = !active.value;
	if (active.value && active_bell.value) {
        unbadgeNotifications();
    }
};

const hideConfigurator = () => {
    active.value = false;
};

const unbadgeNotifications = () => {
    let timer = 3;
    const interval = setInterval(async () => {
        if (timer > 0 && active.value) {
            timer--;
        } else {
            if (timer === 0) {
                await updateMyNotifications(data_request);
                await getMyNotifications(data_request);
                active_bell.value = false;
            }
            clearInterval(interval);
        }
    }, 1000);
};
</script>

<template>
	<div id="layout-config" :class="['layout-config', {'layout-config-active': active}]">

		<div v-for="notification in myNotifications" :key="notification.notification_id">
			<span v-if="notification.notification_id == null">
				<span v-on="active_bell=true"></span>
			</span>
		</div>
		
		<a href="#" class="layout-config-button" id="layout-config-button" @click="onConfigButtonClick()">
			<i class="pi pi-bell"><a href="#" v-if="active_bell==true" v-badge.danger></a></i>
		</a>

		<Sidebar v-model:visible="visible" position="right" class="layout-config-sidebar w-26rem" pt:closeButton="ml-auto">

			<div class="layout-config-content">
				<div class="flex align-items-center justify-content-between mb-4">
					<h5>Notifications</h5>
				</div>
				
				<span class="block text-600 font-medium mb-3">TODAY</span>
				<div class="p-alert" v-for="notification in myNotifications" :key="notification.notification_id">
					<ul class="p-0 mx-0 mt-0 mb-4 list-none">
						<li class="flex align-items-center py-2 border-bottom-1 surface-border">
							<div class="w-3rem h-3rem flex align-items-center justify-content-center bg-blue-100 border-circle mr-3 flex-shrink-0">
								<i class="pi pi-user text-xl text-blue-500"></i>
							</div>
							<span class="text-900 line-height-3" ><strong>{{ notification.title }} </strong><br/>
								<span class="p-tag p-component" v-if="notification.notification_id == null">
									<span class="p-tag-value" v-on="active_bell=true">NEW</span>
								</span><br>
								<span class="text-700">{{ notification.description }}</span><br>
								<span class="text-blue-500">{{ notification.created_at }}</span>
							</span>
						</li>
					</ul>
				</div>
			</div>
		</Sidebar>
	</div>
</template>

<style lang="scss" scoped></style>
