import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  jwt: null, // Store JWT token
  user: null, // Store user info
  isAuthenticated: false, 
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.jwt = action.payload.jwt; // Save JWT token
      state.user = action.payload.user; // Save user details
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.jwt = null; // Clear token
      state.user = null; // Clear user data
      state.isAuthenticated = false;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;