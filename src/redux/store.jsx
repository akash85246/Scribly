import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import settingsReducer from "./slices/settingsSlice";
import authReducer from "./slices/authSlice";


const store = configureStore({
  reducer: {
    user: userReducer,
    settings: settingsReducer,
    auth: authReducer,
  },
});

export default store;