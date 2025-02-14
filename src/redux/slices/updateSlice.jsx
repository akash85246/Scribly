import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  update: false,
  id: "",
  text: "",
  content: "",
  position: "",
  alert: "",
  star: false,
};

const updateSlice = createSlice({
  name: "update",
  initialState,
  reducers: {
    openUpdateMode: (state, action) => {
      state.update = true;
      state.id = action.payload.id;
      state.text = action.payload.text;
      state.content = action.payload.content;
      state.alert = action.payload.alert;
      state.position = action.payload.position;
      state.star = action.payload.star;
    },
    closeUpdateMode: (state) => {
      state.update = false;
      state.id = "";
      state.text = "";
      state.content = "";
      state.alert = "";
      state.position = "";
      state.star = false;
    },
  },
});

export const { openUpdateMode, closeUpdateMode } = updateSlice.actions;
export default updateSlice.reducer;
