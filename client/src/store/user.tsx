import { createSlice } from "@reduxjs/toolkit";

const user = createSlice({
  name: 'user',
	initialState: {
		usermajor : '', userphone : '', userimage: '', useremail : '', usertype: '',
		usercollege: '', username: '', accessToken: ''
	},
	reducers : {
		setUser(state, action) { // 로그인
			const { usermajor, usercollege, username, useremail} = action.payload;
			state.usermajor = usermajor;
			state.usercollege = usercollege;
			state.username = username;
			state.useremail = useremail;
		},
		setLogin(state, action) {
			const {username, accessToken} = action.payload;
			state.username = username;
			state.accessToken = accessToken;
		},
	}
})

export const { setUser, setLogin } = user.actions;
export default user.reducer;
