"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var state = {
  userId: '',
  userSlug: '',
  userToken: localStorage.getItem("token") ? localStorage.getItem("token") : "",
  user: {}
};
var mutations = {
  'SET_USER_ID': function SET_USER_ID(state, userId) {
    state.userId = userId;
  },
  'SET_USER_SLUG': function SET_USER_SLUG(state, userSlug) {
    state.userSlug = userSlug;
  },
  'SET_USER_TOKEN': function SET_USER_TOKEN(state, userToken) {
    state.userToken = userToken;
  },
  'SET_USER': function SET_USER(state, user) {
    state.user = user;
  },
  'CLEAR_TOKEN': function CLEAR_TOKEN(state) {
    state.userToken = '';
    localStorage.removeItem("expiresIn");
    localStorage.removeItem("token");
  }
};
var actions = {
  register: function register(_ref, data) {
    var commit = _ref.commit;
    commit('SET_USER_ID', data.user.id);
    commit('SET_USER_SLUG', data.user.slug);
    commit('SET_USER_TOKEN', data.token);
    commit('SET_USER', data.user);
    localStorage.setItem("token", data.token);
    var timing = new Date().getTime() + 2592000000;
    localStorage.setItem("expiresIn", timing);
  },
  login: function login(_ref2, user) {
    var commit = _ref2.commit;
    commit('SET_USER_ID', user.id);
    commit('SET_USER_SLUG', user.slug);
    commit('SET_USER', user);
  },
  cleanToken: function cleanToken(_ref3) {
    var commit = _ref3.commit;
    commit('CLEAR_TOKEN');
  }
};
var getters = {
  getUserID: function getUserID(state) {
    return state.userId;
  },
  getUserSlug: function getUserSlug(state) {
    return state.userSlug;
  },
  getUserToken: function getUserToken(state) {
    return state.userToken;
  },
  getUser: function getUser(state) {
    return state.user;
  }
};
var _default = {
  state: state,
  mutations: mutations,
  actions: actions,
  getters: getters
};
exports["default"] = _default;