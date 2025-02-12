import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  darkMode: false,
  notifications: true,
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
    setNotifications: (state, action) => {
      state.notifications = action.payload;
    },
  },
});

export const { toggleDarkMode, setNotifications } = settingsSlice.actions;
export default settingsSlice.reducer;