import {configureStore, createSlice, PayloadAction} from '@reduxjs/toolkit'

interface Professor {
    profId: string;
    profName: string;
    profMajor: string;
    profPhone: string;
    profEmail: string;
    profLab: string;
    profLink: string;
    recNumber: number;
    recDate: string;
  }

interface ProfessorState {
    prof: Professor[];
}

const initialState: ProfessorState = {
    prof: [],
};

export let professor = createSlice ({
    name : 'professor',
    initialState,
    reducers: {
        // addProfessor(state, action) {
        //     state.push(action.payload);
        // },
        addProfessor(state, action: PayloadAction<Professor>) {
            state.prof.push(action.payload);
        },
        deleteProfessor(state, action: PayloadAction<string>) {
            const idToDelete = action.payload;
            state.prof = state.prof.filter(item => item.profId !== idToDelete);
        },
        resetProfessor(state) {
            state.prof = [];
        },
    }
})

export const { addProfessor, deleteProfessor, resetProfessor } = professor.actions;
export default professor.reducer