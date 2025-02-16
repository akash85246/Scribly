import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: localStorage.getItem("id") || null,
  username: localStorage.getItem("username") || null,
  profile_picture: localStorage.getItem("profile_picture") || null,
  email: localStorage.getItem("email") || null,
  last_online: new Date().toLocaleString(),
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
      const formattedLastOnline = new Date(action.payload.last_online).toLocaleString();
      state.last_online = formattedLastOnline;

      localStorage.setItem("id", action.payload.id);
      localStorage.setItem("username", action.payload.username);
      localStorage.setItem("profile_picture", action.payload.profile_picture);
      localStorage.setItem("email", action.payload.email);
      localStorage.setItem("last_online", action.payload.last_online);
    },
    clearUser: (state) => {
      state.id = null;
      state.username = "";
      state.profile_picture = "";
      state.email = "";
      state.last_online = "";

      localStorage.removeItem("id");
      localStorage.removeItem("username");
      localStorage.removeItem("profile_picture");
      localStorage.removeItem("email");
      localStorage.removeItem("last_online");
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
