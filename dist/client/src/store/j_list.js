"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeList = exports.addList = exports.j_list = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
exports.j_list = (0, toolkit_1.createSlice)({
    name: 'j_list',
    initialState: [
        { categori: 'none', title: 'none', date: '2023-10-01' }
    ],
    reducers: {
        addList(state, action) {
            state.push(action.payload);
        },
        removeList(state, action) {
            state.splice(action.payload, 1);
        }
    }
});
_a = exports.j_list.actions, exports.addList = _a.addList, exports.removeList = _a.removeList;
exports.default = exports.j_list.reducer;
