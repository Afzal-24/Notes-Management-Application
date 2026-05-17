import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface NotesManagementState {}

const initialState: NotesManagementState = {};

const notesManagementSlice = createSlice({
  name: "notesManagement",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export default notesManagementSlice.reducer;
