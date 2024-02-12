"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
require("../styles/App.css");
function Mynavbar() {
    return ((0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsxs)("div", { className: "navbar", children: [(0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)("p", { className: "navbar_webname", children: " \uC6F9\uC774\uB984 " }) }), (0, jsx_runtime_1.jsxs)("div", { className: "navbar_menu", children: [(0, jsx_runtime_1.jsx)("p", { className: "navbar_text", children: " \uD559\uBD80 \uC5F0\uAD6C\uC0DD" }), (0, jsx_runtime_1.jsx)("p", { className: "navbar_text", children: " \uD300\uC6D0 \uBAA8\uC9D1 " }), (0, jsx_runtime_1.jsx)("p", { className: "navbar_text", children: " \uC7A5\uD559 \uBC0F \uACF5\uBAA8\uC804 " }), (0, jsx_runtime_1.jsx)("p", { className: "navbar_text", children: " \uB3D9\uC544\uB9AC \uACF5\uC9C0 " })] }), (0, jsx_runtime_1.jsx)("form", { method: "GET", action: "/login", children: (0, jsx_runtime_1.jsx)("button", { className: 'navbar_button', children: "\uB85C\uADF8\uC778" }) })] }) }));
}
exports.default = Mynavbar;
