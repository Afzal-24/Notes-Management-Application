import { configureStore } from "@reduxjs/toolkit";
import noteManagementReducer from "./slices/notesManagement.slice";

export const store = configureStore({
  reducer: {
    noteManagement: noteManagementReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type RootDispatch = typeof store.dispatch;
