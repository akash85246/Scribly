import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: "",
  severity: "success",
  open: false,
};

const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    openToast: (state, action) => {
      state.message = action.payload.message;
      state.severity = action.payload.severity;
      state.open = true;
    },
    closeToast: (state) => {
      state.open = false;
      state.message = "";
      state.severity = "success";
    },
  },
});

export const { openToast, closeToast } = toastSlice.actions;
export default toastSlice.reducer;
