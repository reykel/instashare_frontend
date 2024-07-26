import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import SecureLS from 'secure-ls'
import axios from 'axios'

const ls = new SecureLS({
    isCompression: false
})

const store = createStore({
    state: {
        user: {},
        title: "Vue Manager",
        token: null,
        refresh_token: null,
        scopes: null,
        access_flag: false,
        notifications: {},
        redirect: null,
    },
    getters: {
        user: (state) => {
            return state.user
        },
        token: (state) => {
            return state.token
        },
        refresh_token: (state) => {
            return state.refresh_token
        },
        scopes: (state) => {
            return state.scopes
        },
        access_flag: (state) => {
            return state.access_flag
        },
        notifications: (state) => {
            return state.notifications
        },
        redirect: (state) => {
            return state.redirect
        },
    },
    actions: {
        user(context, user) {
            context.commit('user_mutation', user)
        },
        token(context, token) {
            context.commit('token_mutation', token)
        },
        refresh_token(context, refresh_token) {
            context.commit('refresh_token_mutation', refresh_token)
        },
        refreshToken: async ({ state, commit }) => {
            const refreshUrl = "refresh";
            await axios
                .post(refreshUrl, { refresh_token: state.refresh_token })
                .then(response => {
                  if (response.status === 200) {
                    commit('token_mutation', response.data.token)
                    commit('refresh_token_mutation', response.data.refresh_token)
                    commit('user_mutation', response.data.user.name)
                  }
                }
            );
        },
        scopes(context, scopes) {
            context.commit('scopes_mutation', scopes)
        },
        access_flag(context, access_flag) {
            context.commit('access_flag_mutation', access_flag)
        },
        notifications(context, notifications) {
            context.commit('notifications_mutation', notifications)
        },
        clear_user_data(context) {
            context.commit('clear_user_data_mutation')
        },
        redirect(context, redirect) {
            context.commit('redirect_mutation', redirect)
        },
    },
    mutations: {
        user_mutation(state, user) {
            state.user = user
        },
        token_mutation(state, token) {
            state.token = token
        },
        refresh_token_mutation(state,refresh_token) {
            state.refresh_token = refresh_token
        },
        scopes_mutation(state, scopes) {
            state.scopes = scopes
        },
        access_flag_mutation(state, access_flag) {
            state.access_flag = access_flag
        },
        notifications_mutation(state, notifications) {
            state.notifications = notifications
        },
        clear_user_data_mutation: function(state) {
            state.user = {};
            state.refresh_token = null;
            state.token = null;
            state.scopes = null;
            state.access_flag = false;
            state.notifications = {};
        },
        redirect_mutation(state, redirect) {
            state.redirect = redirect
        },
    },

    plugins: [
        createPersistedState({
            storage: {
                getItem: (key) => ls.get(key),
                setItem: (key, value) => ls.set(key, value),
                removeItem: (key) => ls.remove(key),
            },
        }),
    ],

})

export default store
