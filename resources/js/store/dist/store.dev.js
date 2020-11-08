"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _vuex = _interopRequireDefault(require("vuex"));

var _user = _interopRequireDefault(require("./user"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_vue["default"].use(_vuex["default"]);

var _default = new _vuex["default"].Store({
  state: {
    loading: false
  },
  actions: {
    load: function load(_ref) {
      var commit = _ref.commit;
      commit('LOADING');
    },
    stopLoad: function stopLoad(_ref2) {
      var commit = _ref2.commit;
      commit('STOP_LOADING');
    }
  },
  mutations: {
    'LOADING': function LOADING(state) {
      state.loading = true;
    },
    "STOP_LOADING": function STOP_LOADING(state) {
      state.loading = false;
    }
  },
  getters: {
    getLoad: function getLoad(state) {
      return state.loading;
    }
  },
  modules: {
    user: _user["default"]
  }
});

exports["default"] = _default;