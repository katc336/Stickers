import { createSlice } from '@reduxjs/toolkit';
import api from './api';

function storeToken(state, { payload }) {
    //check token 
    state.token = payload.token;
    window.sessionStorage.setItem("token", payload.token);
}
// Create a Redux slice for authentication
const authSlice = createSlice({
    name: "auth",
    initialState: { token: window.sessionStorage.getItem("token") ?? null },
    reducers: {},

    extraReducers: (builder) => {
        //Teacher Auth
        builder.addMatcher(
            api.endpoints.register.matchFulfilled, storeToken);
        builder.addMatcher(
            api.endpoints.login.matchFulfilled, storeToken);
        //Parent Auth
        builder.addMatcher(
            api.endpoints.parentLogin.matchFulfilled, storeToken);
        builder.addMatcher(
            api.endpoints.parentRegister.matchFulfilled, storeToken);
        //Student Auth
        builder.addMatcher(
            api.endpoints.studentLogin.matchFulfilled, storeToken);
        builder.addMatcher(
            api.endpoints.studentRegister.matchFulfilled, storeToken);
    }
});

export default authSlice.reducer;
export const { logout } = authSlice.actions;