require('./bootstrap');
import Vue from "vue";
import router from "./router";
import store from "./store/store";
Vue.component("app", require("./App.vue").default)
new Vue({
    el: '#app',
    router,
    store
});