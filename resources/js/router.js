import Vue from "vue";
import VueRouter from "vue-router";
import store from "./store/store";
import auth from "./views/auth/Auth.vue"
import post from "./views/Post.vue";
import relations from "./views/Relations.vue"
import profile from "./views/profile.vue"
import CreatePost from './views/CreatePost.vue'
Vue.use(VueRouter);
const routes = [{
        name: "posts",
        path: "/",
        beforeEnter: (to, from, next) => {
            if (store.getters.getUserToken) {
                next();
            } else
                next("/auth");
        },
        component: post
    },
    {
        name: "auth",
        path: "/auth",
        component: auth,
        beforeEnter: (to, from, next) => {
            if (!store.getters.getUserToken) {
                next();
            } else
                next("/");
        },

    },
    {
        name: "relations",
        path: "/relations",
        component: relations
    },
    {
        name: "profile",
        path: "/profile",
        component: profile
    },
    {
        name: "create-post",
        path: "/create-post",
        component: CreatePost
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