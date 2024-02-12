import {configureStore, createSlice} from '@reduxjs/toolkit'

interface ProfessorHistory {
    date: string;
    content: string;
}
export let profHistory:any = createSlice ({
    name : 'profHistory',
    initialState : [
        {
        date : '2000-00-00',
        content : ''
        }
    ],
    reducers: {
        addProfHistory(state, action) {
            state.push(action.payload)
        },
        // deleteProfHistory(state, action) {
        //     const idToDelete = action.payload;
        //     const indexToDelete = state.findIndex(item => item._id == idToDelete);
        //     state.splice(indexToDelete, 1)
        // }
    }
})

export const { addProfHistory, deleteProfHistory } = profHistory.actions;
export default profHistory.reducer