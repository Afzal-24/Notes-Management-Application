import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addNoteApi, getNoteStatusesApi } from "../../api/notesManagement.api";
import type { INoteStatus } from "../../models/notesManagement.model";

interface NotesManagementState {
  noteStatuses: INoteStatus[];
  loading: boolean;
  loadingStates: {
    addNoteLoading: boolean;
  };
}

const initialState: NotesManagementState = {
  noteStatuses: [],
  loading: false,
  loadingStates: {
    addNoteLoading: false,
  },
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

export const addNote = createAsyncThunk(
  "notesManagement/addNote",
  async (
    data: {
      title: string;
      description: string;
      status: string;
    },
    { rejectWithValue },
  ) => {
    try {
      const response = await addNoteApi(data);

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
      })
      .addCase(addNote.pending, (state) => {
        state.loadingStates.addNoteLoading = true;
      })
      .addCase(addNote.fulfilled, (state) => {
        state.loadingStates.addNoteLoading = false;
      })
      .addCase(addNote.rejected, (state) => {
        state.loadingStates.addNoteLoading = false;
      });
  },
});

export default notesManagementSlice.reducer;
