"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var state = {
  userId: '',
  userSlug: '',
  userToken: ''
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
  }
};
var actions = {
  setUserId: function setUserId(_ref, userId) {
    var commit = _ref.commit;
    commit('SET_USER_ID', userId);
  },
  setUserSlug: function setUserSlug(_ref2, userSlug) {
    var commit = _ref2.commit;
    commit('SET_USER_SLUG', userSlug);
  },
  setUserToken: function setUserToken(_ref3, userToken) {
    var commit = _ref3.commit;
    commit('SET_USER_TOKEN', userToken);
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
  }
};
var _default = {
  state: state,
  mutations: mutations,
  actions: actions,
  getters: getters
};
exports["default"] = _default;