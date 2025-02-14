import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import settingsReducer from "./slices/settingsSlice";
import authReducer from "./slices/authSlice";
import noteReducer from "./slices/noteSlice";
import toastReducer from "./slices/toastSlice"
import updateReducer from "./slices/updateSlice"


const store = configureStore({
  reducer: {
    user: userReducer,
    settings: settingsReducer,
    auth: authReducer,
    note: noteReducer,
    toast: toastReducer,
    update: updateReducer,
  },
});

export default store;