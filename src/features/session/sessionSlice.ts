import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface SessionSlice {
  uid: string | null;
}

const initialState: SessionSlice = {
  uid: window.localStorage.getItem("chatuid"),
};

export const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.uid = action.payload;
      window.localStorage.setItem("chatuid", state.uid);
    },
    logout: (state) => {
      state.uid = null;
      window.localStorage.removeItem("chatuid");
    },
  },
});

export const { login, logout } = sessionSlice.actions;
export default sessionSlice.reducer;
