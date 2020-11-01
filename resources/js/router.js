import Vue from "vue";
import VueRouter from "vue-router";
import store from "./store/store";
import auth from "./views/auth/Auth.vue"
Vue.use(VueRouter);
const routes = [{
        name: "posts",
        path: "/",
        beforeEnter: (to, from, next) => {
            if (store.getters.getUserToken) {
                next();
            }
            next("/auth");
        }
    },
    {
        name: "auth",
        path: "/auth",
        component: auth
    }
];
export default new VueRouter({
    mode: "history",
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) return savedPosition;
        if (to.hash) return { selector: to.hash }
        else return { x: 0, y: 0 }
    }
})