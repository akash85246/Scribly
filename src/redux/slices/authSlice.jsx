import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  jwt: localStorage.getItem("jwt") || null,
  isAuthenticated: localStorage.getItem("isAuthenticated") === "true", 
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.jwt = action.payload.jwt;
      state.isAuthenticated = true;
      localStorage.setItem("jwt", action.payload.jwt);
      localStorage.setItem("isAuthenticated", "true");
    },
    logout: (state) => {
      state.jwt = null;
      state.isAuthenticated = false;
      localStorage.removeItem("jwt");
      localStorage.removeItem("isAuthenticated");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;