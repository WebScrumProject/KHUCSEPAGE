"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProfHistory = exports.addProfHistory = exports.profHistory = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
exports.profHistory = (0, toolkit_1.createSlice)({
    name: 'profHistory',
    initialState: [
        {
            _id: '',
            date: '2000-00-00',
            content: ''
        }
    ],
    reducers: {
        addProfHistory(state, action) {
            state.push(action.payload);
        },
        deleteProfHistory(state, action) {
            const idToDelete = action.payload;
            const indexToDelete = state.findIndex(item => item._id == idToDelete);
            state.splice(indexToDelete, 1);
        }
    }
});
_a = exports.profHistory.actions, exports.addProfHistory = _a.addProfHistory, exports.deleteProfHistory = _a.deleteProfHistory;
exports.default = exports.profHistory.reducer;
