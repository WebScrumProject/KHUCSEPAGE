"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
require("../App.css");
const navbar_1 = __importDefault(require("../components/navbar"));
//asd
function Detail() {
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(navbar_1.default, {}), (0, jsx_runtime_1.jsx)("div", { className: "janghak_text", children: " \uC7A5\uD559 " }), (0, jsx_runtime_1.jsxs)("div", { className: "janghak_container", children: [(0, jsx_runtime_1.jsx)("button", { className: 'janghak_categori', children: " \uC804\uCCB4 " }), (0, jsx_runtime_1.jsx)("input", { className: 'janghak_search', type: 'text' }), (0, jsx_runtime_1.jsx)("button", { className: 'janghak_icon', children: " \uB3CB\uBCF4\uAE30 " })] })] }));
}
exports.default = Detail;
