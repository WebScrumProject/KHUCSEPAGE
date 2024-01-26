import {configureStore, createSlice} from '@reduxjs/toolkit'
import { create } from 'domain'
import {j_list} from './j_list';
import { professor } from './professor';
import { profHistory} from './profHistory';

// 스토어 설정
export const store = configureStore({
  reducer: {
    j_list: j_list.reducer,
    professor: professor.reducer,
    profHistory: profHistory.reducer
  },
});

// RootState 타입 정의
export type RootState = ReturnType<typeof store.getState>;
export default store;