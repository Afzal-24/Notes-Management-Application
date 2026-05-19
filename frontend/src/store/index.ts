import { configureStore } from "@reduxjs/toolkit";
import noteManagementReducer from "./slices/notesManagement.slice";
import authReducer from "./slices/auth.slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    noteManagement: noteManagementReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type RootDispatch = typeof store.dispatch;
