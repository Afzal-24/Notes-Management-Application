import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getNoteStatusesApi } from "../../api/notesManagement.api";
import type { INoteStatus } from "../../models/notesManagement.model";

interface NotesManagementState {
  noteStatuses: INoteStatus[];
  loading: boolean;
}

const initialState: NotesManagementState = {
  noteStatuses: [],
  loading: false,
};

export const getNoteStatuses = createAsyncThunk(
  "notesManagement/getNoteStatuses",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getNoteStatusesApi();

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

const notesManagementSlice = createSlice({
  name: "notesManagement",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getNoteStatuses.pending, (state) => {
        state.loading = true;
      })
      .addCase(getNoteStatuses.fulfilled, (state, action) => {
        state.loading = false;
        state.noteStatuses = action.payload;
      })
      .addCase(getNoteStatuses.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default notesManagementSlice.reducer;
