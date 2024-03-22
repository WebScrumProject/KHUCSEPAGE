import { createSlice } from "@reduxjs/toolkit";

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
		setLogin(state, action) {
			const {username, accessToken} = action.payload;
			state.username = username;
			state.accessToken = accessToken;
		},
	}
})

export const { getUser, setLogin } = user.actions;
export default user.reducer;
