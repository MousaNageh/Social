const state = {
    userId: '',
    userSlug: '',
    userToken: ''
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
    }
}
const actions = {
    setUserId({ commit }, userId) {
        commit('SET_USER_ID', userId)
    },
    setUserSlug({ commit }, userSlug) {
        commit('SET_USER_SLUG', userSlug);
    },
    setUserToken({ commit }, userToken) {
        commit('SET_USER_TOKEN', userToken)
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
    }
}
export default {
    state,
    mutations,
    actions,
    getters
}