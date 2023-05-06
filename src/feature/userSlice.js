import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
	name: "userReducer",
	initialState: {
		usertype: null,
	},

	reducers: {
		setUserType: (state, action) => {
			console.log("reducer" + action.payload);
			state.usertype = action.payload;
		},
	},
});
export const selectTypeUser = (state) => state.userReducer.usertype;
export const { setUserType } = userSlice.actions;
export default userSlice.reducer;
