"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.store = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const j_list_1 = require("./j_list");
const professor_1 = require("./professor");
const profHistory_1 = require("./profHistory");
// 스토어 설정
exports.store = (0, toolkit_1.configureStore)({
    reducer: {
        j_list: j_list_1.j_list.reducer,
        professor: professor_1.professor.reducer,
        profHistory: profHistory_1.profHistory.reducer
    },
});
exports.default = exports.store;
