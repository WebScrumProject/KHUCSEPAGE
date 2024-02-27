import {configureStore, createSlice} from '@reduxjs/toolkit'

let IsLogined = createSlice ({
    name : 'IsLogined',
    initialState : 
            {
                isLogined: false,
                name : "",
                profileImage : null,
                userid: ""

            },

    reducers : {
        changeIsLogined(state,action) {
            state.isLogined = true;
            state.name =  action.payload.name;
        }
    }
})

let j_list = createSlice ({
    name : 'j_list',

    initialState : 
        [
            { 
                title:'',
                category:'',
                link:'',
                writer:'',
                date:0,
                content:null,
                file:'',
                fileName:''
            },

        ],

    reducers : {
        setList(state,action) {
            return action.payload
        },
        resetList(state) {
            state.splice(0,state.length)
        },

        removeList(state,action) {
            state.splice(action.payload,1)
        },

    }
})

let p_list = createSlice ({
    name: 'p_list',
    
    initialState: [
        {
            title: '',
            category: '',
            writer: '',
            date: 0,
            id:"",

            content: {
                image: null,
                video: null,
                text: '',
                file: '',
            },

            recruit: [
                {
                    field: '',
                    apply_cnt: 0,
                    cate_field:''
                }
            ],
            
            deadline: 0,
            is_done: false,

            apply: [
                {
                    date: 0,
                    name: '',
                    field: '',
                    memo: '',
                }
            ]
        },
    ],
    reducers: {
        p_addList(state,action) {
            state.push(action.payload)
        },
        p_resetList(state) {
            state.splice(0,state.length)
        },
        p_removeList(state,action) {
            state.splice(action.payload,1)
        },
        p_addcontent(state,action) {
            state[0].content.text = action.payload;
        },
        p_addtitle(state,action) {
            state[0].title = action.payload;
        },
        p_addrecruit(state) {
            state[0].recruit.push({
                field: '',
                apply_cnt: 0,
                cate_field:''
            })
        },
        p_removerecruit(state,action) {
            state[0].recruit.splice(action.payload,1);
        },
        p_addimage(state,action) {
            state[0].content.image = action.payload;
        },
        p_addvideo(state,action) {
            state[0].content.video = action.payload;
        },
        p_addfile(state,action) {
            state[0].content.file = action.payload;
        },
        p_addfield(state,action){
            if(state[0].recruit.length!=action.payload.num) {
                
                /* while(state[0].recruit.length!=action.payload.num) {
                    state[0].recruit.push(
                        {
                            field: '',
                            apply_cnt: 0,
                        }
                    )
                } */
            }
            
            state[0].recruit[action.payload.num].field =action.payload.field;
            state[0].recruit[action.payload.num].cate_field =action.payload.cate_field;
        },
        p_addapply_cnt(state,action){
            if(state[0].recruit.length!=action.payload.num) {
                /* while(state[0].recruit.length!=action.payload.num) {
                    state[0].recruit.push(
                        {
                            field: '',
                            apply_cnt: 0,
                        }
                    )
                } */
            }
            state[0].recruit[action.payload.num].apply_cnt=action.payload.apply_cnt;
        },
        p_cate_change(state,action){
            state[0].category = action.payload;
        },
        p_addDate(state,action) {
            state[0].date = action.payload;
        },
        p_addDeadline(state,action){
            state[0].deadline=action.payload;
        },
        p_addUser(state,action) {
            state[0].writer = action.payload;
        }

    }
})


export const { setList, removeList,resetList } = j_list.actions;
export const { changeIsLogined } = IsLogined.actions;
export const { p_addList, p_removeList, p_resetList,
                p_addrecruit, p_addcontent, p_removerecruit, 
                p_addtitle,p_addimage, p_addfield, p_addapply_cnt, p_cate_change, p_addfile, p_addvideo, p_addDate, p_addUser,p_addDeadline} = p_list.actions;

// 스토어 설정
const store = configureStore({
  reducer: {
    j_list: j_list.reducer,
    IsLogined:IsLogined.reducer,
    p_list:p_list.reducer,

  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
});

// RootState 타입 정의
export type RootState = ReturnType<typeof store.getState>;
export default store;