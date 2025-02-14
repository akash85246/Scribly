import { createSlice } from "@reduxjs/toolkit";

const safeParse = (key, defaultValue) => {
  try {
    const item = localStorage.getItem(key);
    if (item === null || item === "undefined") return defaultValue;
    return JSON.parse(item);
  } catch (error) {
    console.error(`Error parsing localStorage key "${key}":`, error);
    return defaultValue;
  }
};

const initialState = {
  darkMode: safeParse("darkMode", false),
  notification: safeParse("notification", true),
  drag: safeParse("drag", true),
  bg: localStorage.getItem("bg") || null,
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
      localStorage.setItem("darkMode", JSON.stringify(state.darkMode));
    },
    setNotification: (state) => {
      state.notification = !state.notification;
      localStorage.setItem("notification", JSON.stringify(state.notification));
    },
    setDrag: (state) => {
      state.drag = !state.drag;
      localStorage.setItem("drag", JSON.stringify(state.drag));
    },
    setBg: (state, action) => {
      state.bg = action.payload;
      localStorage.setItem("bg", action.payload);
    },
    setSetting: (state, action) => {
      const { darkMode, notification, drag, bg } = action.payload;

      state.darkMode = darkMode;
      localStorage.setItem("darkMode", JSON.stringify(darkMode));

      state.notification = notification;
      localStorage.setItem("notification", JSON.stringify(notification));

      state.drag = drag;
      localStorage.setItem("drag", JSON.stringify(drag));

      state.bg = bg;
      localStorage.setItem("bg", bg);
    },
    deleteSetting: (state) => {
      state.darkMode = false;
      localStorage.removeItem("darkMode");

      state.notification = true;
      localStorage.removeItem("notification");

      state.drag = true;
      localStorage.removeItem("drag");

      state.bg = null;
      localStorage.removeItem("bg");
    },
  },
});

export const { toggleDarkMode, setNotification, setBg, setSetting, setDrag,deleteSetting } =
  settingsSlice.actions;
export default settingsSlice.reducer;