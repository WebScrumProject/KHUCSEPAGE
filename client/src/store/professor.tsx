import {configureStore, createSlice} from '@reduxjs/toolkit'

interface ProfessorState {
    _id: string;
    profName: string;
    profMajor: string;
    profPhone: string;
    profEmail: string;
    profLab: string;
    profLink: string;
    recNumber: string;
    recDate: string;
}
export let professor = createSlice ({
    name : 'professor',
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
            const indexToDelete = state.findIndex(item => item._id === idToDelete);
            state.splice(indexToDelete, 1)
        }
    }
})

export const { addProfessor, deleteProfessor } = professor.actions;
export default professor.reducer