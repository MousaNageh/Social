require('./bootstrap');
import Vue from "vue";
import router from "./router";
import store from "./store/store";
import Vuelidate from "vuelidate";
import axios from "axios";
axios.defaults.baseURL = 'http://127.0.0.1:8000/api/';
Vue.use(Vuelidate);
Vue.component("app", require("./App.vue").default)

new Vue({
    el: '#app',
    router,
    store,
});