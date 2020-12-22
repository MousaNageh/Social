const state = {
    userId: '',
    userSlug: '',
    userToken: localStorage.getItem("token") ? localStorage.getItem("token") : "",
    user: {}
}
const mutations = {
    'SET_USER_ID' (state, userId) {
        state.userId = userId;
    },
    'SET_USER_SLUG' (state, userSlug) {
        state.userSlug = userSlug;
    },
    'SET_USER_TOKEN' (state, userToken) {
        state.userToken = userToken;
    },
    'SET_USER' (state, user) {
        state.user = user;
    },
    'CLEAR_TOKEN' (state) {
        state.userToken = '';
        localStorage.removeItem("expiresIn");
        localStorage.removeItem("token");
    }
}
const actions = {
    register({ commit }, data) {
        commit('SET_USER_ID', data.user.info.id);
        commit('SET_USER_SLUG', data.user.info.slug);
        commit('SET_USER_TOKEN', data.token);
        commit('SET_USER', data.user);
        localStorage.setItem("token", data.token);
        let timing = new Date().getTime() + 2592000000;
        localStorage.setItem("expiresIn", timing);
    },
    login({ commit }, user) {
        commit('SET_USER_ID', user.info.id);
        commit('SET_USER_SLUG', user.info.slug);
        commit('SET_USER', user);
    },
    cleanToken({ commit }) {
        commit('CLEAR_TOKEN');
    },
    setUser({ commit }, user) {
        commit('SET_USER', user);
    }


}
const getters = {
    getUserID(state) {
        return state.userId;
    },
    getUserSlug(state) {
        return state.userSlug;
    },
    getUserToken(state) {
        return state.userToken;
    },
    getUser(state) {
        return state.user;
    }
}
export default {
    state,
    mutations,
    actions,
    getters
}