import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  views: "card",
};

const viewSlice = createSlice({
  name: "view",
  initialState,
  reducers: {
    setViews: (state, action) => {
      state.views = action.payload;
    },
    removeViews: (state) => {
      state.views = "card";
    },
  },
});

export const { setViews, removeViews } = viewSlice.actions;
export default viewSlice.reducer;
