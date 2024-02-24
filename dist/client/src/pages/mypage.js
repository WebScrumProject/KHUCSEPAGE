"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
function Mypage() {
    let [tab, setTab] = (0, react_1.useState)(0); // 일단 임시로 state, redux 설치하면 CreateSlice 사용 예정
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)("div", { className: 'mypage_container', children: [(0, jsx_runtime_1.jsxs)("div", { className: 'mypage_profile', children: [(0, jsx_runtime_1.jsx)("div", { className: 'mypage_picture', children: (0, jsx_runtime_1.jsx)("img", { src: "https://dev.w3.org/SVG/tools/svgweb/samples/svg-files/mac.svg", alt: "\uD504\uC0AC" }) }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("p", { children: "\uD64D\uAE38\uB3D9" }), (0, jsx_runtime_1.jsx)("p", { children: "abcdefg@khu.ac.kr" }), (0, jsx_runtime_1.jsx)("p", { children: "010-1234-1234" }), (0, jsx_runtime_1.jsx)("p", { children: "\uC18C\uD504\uD2B8\uC6E8\uC5B4\uC735\uD569\uB300\uD559" }), (0, jsx_runtime_1.jsx)("p", { children: "\uCEF4\uD4E8\uD130\uACF5\uD559\uBD80 \uCEF4\uD4E8\uD130\uACF5\uD559\uACFC" })] }), (0, jsx_runtime_1.jsx)("button", { className: 'mypage_button', children: "\uC218\uC815" })] }), (0, jsx_runtime_1.jsxs)("div", { className: 'mypage_content', children: [(0, jsx_runtime_1.jsxs)("div", { className: 'button_container', children: [(0, jsx_runtime_1.jsx)("button", { className: 'content_button', children: "\uC791\uC131\uD55C \uAE00 \uBAA9\uB85D" }), (0, jsx_runtime_1.jsx)("button", { className: 'content_button', children: "\uAD00\uC2EC\uD55C \uAE00 \uBAA9\uB85D" }), (0, jsx_runtime_1.jsx)("button", { className: 'content_button', children: "\uC9C0\uC6D0\uD55C \uD504\uB85C\uC81D\uD2B8" })] }), (0, jsx_runtime_1.jsx)(Tab, {})] })] }), (0, jsx_runtime_1.jsx)("div", { className: 'mypage_portfolio', children: " " })] }));
}
function Tab() {
    // if (props.tab == 0) {
    return ((0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)("div", { className: 'content', children: (0, jsx_runtime_1.jsxs)("div", { className: 'janghak_list', children: [(0, jsx_runtime_1.jsx)("div", { className: 'janghak_thick_line' }), (0, jsx_runtime_1.jsxs)("div", { className: 'janghak_title', children: [(0, jsx_runtime_1.jsx)("div", { className: 'janghak_text1', children: "\uAC8C\uC2DC\uD310" }), (0, jsx_runtime_1.jsx)("div", { className: 'janghak_text1', children: "\uC81C\uBAA9" }), (0, jsx_runtime_1.jsx)("div", { className: 'janghak_text1', children: "\uB4F1\uB85D\uC77C" })] }), (0, jsx_runtime_1.jsx)("div", { className: 'janghak_thin_line' })] }) }) }));
    // }
}
exports.default = Mypage;
