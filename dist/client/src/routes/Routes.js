"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
require("../styles/App.css");
const mypage_1 = __importDefault(require("../pages/mypage"));
const NewUser_1 = __importDefault(require("../pages/NewUser"));
const Research_1 = __importDefault(require("../pages/Research"));
const AddProfessor_1 = __importDefault(require("../pages/AddProfessor"));
const UndergraduateStudentDetail_1 = __importDefault(require("../pages/UndergraduateStudentDetail"));
const react_router_dom_1 = require("react-router-dom");
function Routing() {
    return ((0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsxs)(react_router_dom_1.Routes, { children: [(0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: '/mypage', element: (0, jsx_runtime_1.jsx)(mypage_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: '/newuser', element: (0, jsx_runtime_1.jsx)(NewUser_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: '/research', element: (0, jsx_runtime_1.jsx)(Research_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: '/addProfessor', element: (0, jsx_runtime_1.jsx)(AddProfessor_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: '/detail', element: (0, jsx_runtime_1.jsx)(UndergraduateStudentDetail_1.default, {}) })] }) }));
}
exports.default = Routing;
