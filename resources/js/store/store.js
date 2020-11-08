import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
import user from "./user";
export default new Vuex.Store({
    state: {
        loading: false
    },
    actions: {
        load({ commit }) {
            commit('LOADING');
        },
        stopLoad({ commit }) {
            commit('STOP_LOADING');
        }

    },
    mutations: {
        'LOADING' (state) {
            state.loading = true;
        },
        "STOP_LOADING" (state) {
            state.loading = false;
        }
    },
    getters: {
        getLoad(state) {
            return state.loading;
        }
    },
    modules: { user }
});
