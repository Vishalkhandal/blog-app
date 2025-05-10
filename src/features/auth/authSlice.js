// import { createSlice } from "@reduxjs/toolkit";

// const userFromStorage = JSON.parse(localStorage.getItem("user"));

// const authSlice = createSlice({
//   name: "auth",
//   initialState: {
//     user: userFromStorage || null,
//   },
//   reducers: {
//     login: (state, action) => {
//       state.user = action.payload;
//       localStorage.setItem("user", JSON.stringify(action.payload));
//     },
//     logout: (state) => {
//       state.user = null;
//       localStorage.removeItem("user");
//     },
//     register: (state, action) => {
//       state.user = action.payload;
//       localStorage.setItem("user", JSON.stringify(action.payload));
//     },
//   },
// });

// export const { login, logout, register } = authSlice.actions;
// export const selectUser = (state) => state.auth.user;
// export default authSlice.reducer;


import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status : false,
    userData: null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.status = true;
            state.userData = action.payload.userData;
        },
        logout: (state) => {
            state.status = false;
            state.userData = null;
        },
        setUser: (state, action) => {
            state.userData = action.payload;
            state.status = !!action.payload;
        }
     }
})

export const {login, logout, setUser } = authSlice.actions;

export default authSlice.reducer;