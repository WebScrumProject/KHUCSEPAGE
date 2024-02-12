"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const InputProfessor = ({ placeholder, onChange, name, styles }) => {
    return ((0, jsx_runtime_1.jsx)("input", { className: styles.add_professor_input, placeholder: placeholder, onChange: (e) => onChange(e, name) }));
};
exports.default = InputProfessor;
