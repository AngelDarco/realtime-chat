import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  uid: "",
};

export const chatuidSlice = createSlice({
  name: "uidTo",
  initialState,
  reducers: {
    uidTo: (state, action) => {
      state.uid = action.payload;
    },
  },
});

export const { uidTo } = chatuidSlice.actions;
export default chatuidSlice.reducer;
