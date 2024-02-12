"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProfessor = exports.addProfessor = exports.professor = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
exports.professor = (0, toolkit_1.createSlice)({
    name: 'professor',
    initialState: [
        {
            _id: '',
            profName: '홍길동',
            profMajor: 'none',
            profPhone: '010-1234-5678',
            profEmail: 'none',
            profLab: 'none',
            profLink: 'none',
            recNumber: '0',
            recDate: 'none',
        }
    ],
    reducers: {
        addProfessor(state, action) {
            state.push(action.payload);
        },
        deleteProfessor(state, action) {
            const idToDelete = action.payload;
            const indexToDelete = state.findIndex(item => item._id == idToDelete);
            state.splice(indexToDelete, 1);
        }
    }
});
_a = exports.professor.actions, exports.addProfessor = _a.addProfessor, exports.deleteProfessor = _a.deleteProfessor;
exports.default = exports.professor.reducer;
