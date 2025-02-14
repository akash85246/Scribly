import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: localStorage.getItem("id") || null,
  username: localStorage.getItem("username") || null,
  profile_picture: localStorage.getItem("profile_picture") || null,
  email:localStorage.getItem("email") || null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.id = action.payload.id;
      state.username = action.payload.username;
      state.profile_picture = action.payload.profile_picture;
      state.email = action.payload.email;

      localStorage.setItem("id", action.payload.id);
      localStorage.setItem("username", action.payload.username);
      localStorage.setItem("profile_picture", action.payload.profile_picture);
      localStorage.setItem("email", action.payload.email);
    },
    clearUser: (state) => {
      state.id = null;
      state.username = "";
      state.profile_picture = "";
      state.email = "";
      localStorage.removeItem("id");
      localStorage.removeItem("username");
      localStorage.removeItem("profile_picture");
      localStorage.removeItem("email");

    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
