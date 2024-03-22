import { createSlice, PayloadAction} from "@reduxjs/toolkit";

// createAction을 사용하여 액션 정의
const user = createSlice({
  name: 'user',
	initialState: {
		usermajor : '', userphone : '', userimage: '', useremail : '', usertype: '',
		usercollege: '', username: '', accessToken: ''
	},
	reducers : {
		getUser(state, action) { // 마이페이지
			const { usermajor, usercollege, username, useremail, userphone, usertype, userimage} = action.payload;
			state.usermajor = usermajor;
			state.usercollege = usercollege;
			state.username = username;
			state.useremail = useremail;
			state.userphone = userphone;
			state.userimage = userimage;
			state.usertype = usertype;
		},
		setUser(state, action) { // 마이페이지
			const { usermajor, usercollege, username, useremail, userphone, usertype, userimage} = action.payload;
			state.usermajor = usermajor;
			state.usercollege = usercollege;
			state.username = username;
			state.useremail = useremail;
			state.userphone = userphone;
			state.userimage = userimage;
			state.usertype = usertype;
		},
		setUserName(state, action:PayloadAction<string>) {
			const username = action.payload;
			state.username = username;
		},
		setUserCollege(state, action:PayloadAction<string>) {
			const usercollege = action.payload;
			state.usercollege = usercollege;
		},
		setUserMajor(state, action:PayloadAction<string>) {
			const usermajor = action.payload;
			state.usermajor = usermajor;
		},
		setUserImage(state, action:PayloadAction<string>) {
			const userimage = action.payload;
			state.userimage = userimage;
		},
		setUserPhone(state, action:PayloadAction<string>) {
			const userphone = action.payload;
			state.userphone = userphone;
		},
		setLogin(state, action) {
			const {username, accessToken} = action.payload;
			state.username = username;
			state.accessToken = accessToken;
		},
	}
})

export const { getUser, setUser, setUserName, setUserCollege, setUserMajor, setUserPhone, setUserImage, setLogin } = user.actions;
export default user.reducer;
