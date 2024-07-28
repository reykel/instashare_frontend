import axios from "axios";
import store from "./store/index";
import router from "./router"

axios.defaults.baseURL = (process.env.NODE_ENV === 'production' ? 'https://devblackstone.com/api/' : 'http://api.instashare.local/api/')
axios.defaults.withCredentials = true;

axios.interceptors.request.use(
  (config) => {
    const token = store.getters.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);


axios.interceptors.response.use(
    function(response) {
      return response;
    },
    async function(error) {
      const originalRequest = error.config;
      if (
        error.response.status === 401 &&
        originalRequest.url.includes("refresh")
      ) {
        store.dispatch('clear_user_data')
        router.push({name:'Login'});
        return Promise.reject(error);
      } else if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        await store.dispatch("refreshToken");
        return axios(originalRequest);
      }else if (error.response.status === 404) {
        router.push({name:'error'});
      }
      return Promise.reject(error);
    }
  );


