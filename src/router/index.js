import { createRouter, createWebHistory } from 'vue-router';
import AppLayout from '@/layout/AppLayout.vue';
import store from "../store/index";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'app',
            component: AppLayout,
            meta:{
                requiresAuth:true
            }, 
            children: [
                {
                    path: '',
                    name: 'dashboard',
                    component: () => import('@/views/Dashboard.vue'),
                    meta:{
                        requiresPermission: "basic-user"
                    }, 
                },
                {
                    path: '/error',
                    name: 'error',
                    component: () => import('../views/pages/auth/Error.vue'),
                    meta:{
                        requiresPermission: "basic-user"
                    }, 
                },
                {
                    path : '/categorias',
                    name : 'CategoriaIndex',
                    component: () => import('../views/categorias/CategoriaIndex.vue'),
                    meta:{
                        requiresPermission: "client-admin"
                    }, 
                },
                {
                    path : '/categorias/create',
                    name : 'CategoriaCreate',
                    component: () => import('../views/categorias/CategoriaCreate.vue'),
                    meta:{
                        requiresPermission: "client-admin"
                    }, 
                },
                {
                    path : '/categorias/:id/edit',
                    name : 'CategoriaEdit',
                    component: () => import('../views/categorias/CategoriaEdit.vue'),
                    props: true,
                    meta:{
                        requiresPermission: "client-admin"
                    }, 
                },
                {
                    path : '/productos',
                    name : 'ProductoIndex',
                    component: () => import('../views/productos/ProductoIndex.vue'),
                    meta:{
                        requiresPermission: "client-admin"
                    }, 
                },
                {
                    path : '/productos/create',
                    name : 'ProductoCreate',
                    component: () => import('../views/productos/ProductoCreate.vue'),
                    meta:{
                        requiresPermission: "client-admin"
                    }, 
                },
                {
                    path : '/productos/:id/edit',
                    name : 'ProductoEdit',
                    component: () => import('../views/productos/ProductoEdit.vue'),
                    props: true,
                    meta:{
                        requiresPermission: "client-admin"
                    }, 
                },
                {
                    path : '/productos/:id/gallery',
                    name : 'ProductoGallery',
                    component: () => import('../views/productos/ProductoGallery.vue'),
                    props: true,
                    meta:{
                        requiresPermission: "client-admin"
                    }, 
                },
                {
                    path : '/invitation',
                    name : 'Invitation',
                    component: () => import('../views/Invitation.vue'),
                    meta:{
                        requiresPermission: "tenant-admin"
                    }, 
                },
                {
                    path : '/myprofile',
                    name : 'MyProfile',
                    component: () => import('../views/MyProfile.vue'),
                    meta:{
                        requiresPermission: "basic-user"
                    }, 
                },
                {
                    path : '/change-password',
                    name : 'change-password',
                    component: () => import('../views/ChangePassword.vue'),
                    meta:{
                        requiresPermission: "basic-user"
                    }, 
                },
                {
                    path : '/manageusers',
                    name : 'ManageUsers',
                    component: () => import('../views/ManageUsers.vue'),
                    meta:{
                        requiresPermission: "system-admin"
                    }, 
                },
                {
                    path : '/managers',
                    name : 'Managers',
                    component: () => import('../views/managers.vue'),
                    meta:{
                        requiresPermission: "system-admin"
                    }, 
                },
                {
                    path : '/managemyusers',
                    name : 'ManageMyUsers',
                    component: () => import('../views/ManageUsers.vue'),
                    meta:{
                        requiresPermission: "tenant-admin"
                    }, 
                },
                {
                    path : '/notificationsIndex',
                    name : 'NotificationsIndex',
                    component: () => import('../views/NotificationsIndex.vue'),
                    meta:{
                        requiresPermission: "basic-user"
                    }, 
                },
                {
                    path : '/verified',
                    name : 'Verified',
                    component: () => import('../views/Verified.vue'),
                    meta:{
                        requiresPermission: "basic-user"
                    }, 
                },
                {
                    path: '/access',
                    name: 'access',
                    component: () => import('../views/pages/auth/Access.vue'),
                    meta:{
                        requiresAuth: true,
                        requiresPermission: "basic-user"
                    }, 
                },
                {
                    path: '/access-logs',
                    name: 'accessLogs',
                    component: () => import('../views/ManageAccesses.vue'),
                    meta:{
                        requiresAuth: true,
                        requiresPermission: "basic-user"
                    }, 
                },
                {
                    path : '/audit-actions',
                    name : 'AuditActions',
                    component: () => import('../views/ManageAuditorias.vue'),
                    meta:{
                        requiresPermission: "basic-user"
                    }, 
                },
            ]
        },
        {
            path : '/login',
            name : 'Login',
            component: () => import('../views/login.vue'),
            meta:{
                requiresAuth:false
            }, 
        },
        {
            path : '/forgot',
            name : 'Forgot',
            component: () => import('../views/forgot.vue'),
            meta:{
                requiresAuth:false
            }, 
        },
        {
            path : '/register',
            name : 'Register',
            component: () => import('../views/register.vue'),
            meta:{
                requiresAuth:false
            }, 
        },
        {
            path : '/new-password/:token/:email',
            name : 'ResetPassword',
            component: () => import('../views/resetpassword.vue'),
            meta:{
                requiresAuth:false
            }, 
        },
        {
            path : '/set-password/:token/:email',
            name : 'SetPassword',
            component: () => import('../views/setpassword.vue'),
            meta:{
                requiresAuth:false
            }, 
        },
        {
            path: '/notfound',
            name: 'notfound',
            component: () => import('../views/pages/NotFound.vue'),
        },
    ]
});


router.beforeEach((to, from)=>{
    if(to.meta.requiresAuth && !store.getters.token){ 
        store.dispatch('redirect', to.path)
        return { name : 'Login' }
    }
    if(to.meta.requiresAuth == false && store.getters.token){ 
        return { name : 'dashboard' }
    }

    if (typeof to.meta.requiresPermission !== 'undefined'){
        let requiredPermissionTo = to.meta.requiresPermission
        let requiredPermissionFrom = from.meta.requiresPermission
        let retrivedPermissions = new Array

        retrivedPermissions = store.getters.scopes

        const allowedOperationTo =  retrivedPermissions.indexOf(requiredPermissionTo) > -1 ? true : false
        const allowedOperationFrom =  retrivedPermissions.indexOf(requiredPermissionFrom) > -1 ? true : false

        if(to.meta.requiresAuth && store.getters.token && (allowedOperationTo == false) && to.name !== 'access'){
            return { name : 'access' }
        }
        if(to.meta.requiresAuth && store.getters.token && (allowedOperationFrom == false) && to.name == 'access'){
            return { name : 'dashboard' }
        }
        if(to.name == 'Invitation' && store.getters.user['email_verified_at'] == null ){
            return { name : 'dashboard' }
        }
    }
})

export default router;
