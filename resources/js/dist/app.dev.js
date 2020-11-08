"use strict";

var _vue = _interopRequireDefault(require("vue"));

var _router = _interopRequireDefault(require("./router"));

var _store = _interopRequireDefault(require("./store/store"));

var _vuelidate = _interopRequireDefault(require("vuelidate"));

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

require('./bootstrap');

_axios["default"].defaults.baseURL = 'http://127.0.0.1:8000/api/';

_vue["default"].use(_vuelidate["default"]);

_vue["default"].component("app", require("./App.vue")["default"]);

new _vue["default"]({
  el: '#app',
  router: _router["default"],
  store: _store["default"]
});