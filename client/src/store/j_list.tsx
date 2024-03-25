import {configureStore, createSlice} from '@reduxjs/toolkit'

export let j_list = createSlice ({
    name : 'j_list',

    initialState : 
        [
            { categori : 'none', title :'none',  date : '2023-10-01'}
        ],

    reducers : {
        addList(state,action) {
            state.push(action.payload)
        },

        removeList(state,action) {
            state.splice(action.payload, 1)
        }
    }
})

export const { addList, removeList } = j_list.actions;
export default j_list.reducer