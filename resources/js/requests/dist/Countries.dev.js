"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var GetContries = _axios["default"].create({
  baseURL: "https://restcountries.eu/rest/v2/all",
  timeout: 1000,
  headers: {
    "Content-Type": "application/json"
  }
});

var _default = GetContries;
exports["default"] = _default;