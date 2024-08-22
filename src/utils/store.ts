import { configureStore } from "@reduxjs/toolkit";
import sessionReducer from "../features/session/sessionSlice";
import uidTo from "../features/uids/uuidToSlice";

export const store = configureStore({
  reducer: {
    session: sessionReducer,
    uidTo: uidTo,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
