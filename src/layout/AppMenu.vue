    <script setup>
    import { ref } from "vue";
    import AppMenuItem from "./AppMenuItem.vue";
    import { useStore } from "vuex";
    import { useConfirm } from "primevue/useconfirm";
    import { useToast } from "primevue/usetoast";
    import axios from "axios";

    const store = useStore();
    const confirm = useConfirm();
    const toast = useToast();

    const model = ref([
    {
        items: [
        {
            label: "User: " + store.getters.user.name,
        },
        {
            label: "Categorías",
            icon: "pi pi-fw pi-table",
            to: "/categorias",
            visible: store.getters.scopes.indexOf("client-admin") > -1,
        },
        {
            label: "Productos",
            icon: "pi pi-fw pi-table",
            to: "/productos",
            visible: store.getters.scopes.indexOf("client-admin") > -1,
        },
            { label: "Tokens", icon: "pi pi-fw pi-unlock", to: "/managetokens", visible: store.getters.scopes.indexOf("system-admin") > -1 },
            { label: "Users", icon: "pi pi-fw pi-users", to: "/manageusers", visible: store.getters.scopes.indexOf("system-admin") > -1 },
            { label: "Access Logs", icon: "pi pi-fw pi-user-minus", to: "/access-logs", visible: store.getters.scopes.indexOf("system-admin") > -1 },
            { label: "Actions Logs", icon: "pi pi-fw pi-user-minus", to: "/audit-actions", visible: store.getters.scopes.indexOf("system-admin") > -1 },
        ],
    },
    ]);

    const verify_mail = async () => {
    confirm.require({
        message:
        "An email will be sent to your account with a validation link in it. Do you want to continue?",
        header: "You will proceed to validate your email.",
        icon: "pi pi-envelope",
        accept: async () => {
        await axios.post("verification-notification").then((res) => {
            if (res.data.message == "Email Sent.") {
            toast.add({
                severity: "success",
                summary: "Successful",
                detail:
                "A validation email has been sent to your account. Please follow the link in order to complete the operation",
                life: 5000,
            });
            } else {
            toast.add({
                severity: "error",
                summary: "Rejected",
                detail: "Error trying to send email. Please check your internet connection",
                life: 5000,
            });
            }
        });
        },
    });
    };
    </script>

    <template>
    <ul class="layout-menu">
        <template v-for="(item, i) in model" :key="item">
        <app-menu-item v-if="!item.separator" :item="item" :index="i"></app-menu-item>
        <li v-if="item.separator" class="menu-separator"></li>
        </template>
        <Button
        class="p-button-danger"
        @click="verify_mail"
        v-if="store.getters.user['email_verified_at'] === null"
        >Verify your email</Button
        >
    </ul>
    </template>

    <style lang="scss" scoped></style>
