"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _vueRouter = _interopRequireDefault(require("vue-router"));

var _store = _interopRequireDefault(require("./store/store"));

var _Auth = _interopRequireDefault(require("./views/auth/Auth.vue"));

var _Post = _interopRequireDefault(require("./views/posts/Post.vue"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_vue["default"].use(_vueRouter["default"]);

var routes = [{
  name: "posts",
  path: "/",
  beforeEnter: function beforeEnter(to, from, next) {
    if (_store["default"].getters.getUserToken) {
      next();
    } else next("/auth");
  },
  component: _Post["default"]
}, {
  name: "auth",
  path: "/auth",
  component: _Auth["default"],
  beforeEnter: function beforeEnter(to, from, next) {
    if (!_store["default"].getters.getUserToken) {
      next();
    } else next("/");
  }
}];

var _default = new _vueRouter["default"]({
  mode: "history",
  routes: routes,
  scrollBehavior: function scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition;
    if (to.hash) return {
      selector: to.hash
    };else return {
      x: 0,
      y: 0
    };
  }
});

exports["default"] = _default;