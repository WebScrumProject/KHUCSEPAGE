import {configureStore, createSlice} from '@reduxjs/toolkit'

interface History {
    Date: string;
    Content: string;
}
interface ProfessorHistoryState {
    history: History[];
}
const initialState: ProfessorHistoryState = {
    history: [],
};
export let profHistory = createSlice ({
    name : 'profHistory',
    initialState,
    reducers: {
        addProfHistory(state, action) {
            state.history.push(action.payload)
        },
        // deleteProfHistory(state, action) {
        //     const idToDelete = action.payload;
        //     const indexToDelete = state.findIndex(item => item._id == idToDelete);
        //     state.splice(indexToDelete, 1)
        // }
        resetProfHistory(state) {
            state.history = [];
        },

    }
})

export const { addProfHistory, resetProfHistory } = profHistory.actions;
export default profHistory.reducer