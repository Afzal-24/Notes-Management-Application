import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import {
  addNoteApi,
  deleteNoteApi,
  getNoteStatusesApi,
  updateNoteApi,
  updateNoteStatusApi,
} from "../../api/notesManagement.api";
import type {
  INoteStatus,
  NoteStatusEnum,
} from "../../models/notesManagement.model";

interface NotesManagementState {
  noteStatuses: INoteStatus[];
  loading: boolean;
  loadingStates: {
    addNoteLoading: boolean;
    updateNoteStatusLoading: boolean;
    updateNoteLoading: boolean;
    deleteNoteLoading: boolean;
  };
}

const initialState: NotesManagementState = {
  noteStatuses: [],
  loading: false,
  loadingStates: {
    addNoteLoading: false,
    updateNoteStatusLoading: false,
    updateNoteLoading: false,
    deleteNoteLoading: false,
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

export const updateNoteStatus = createAsyncThunk(
  "notesManagement/updateNoteStatus",
  async (
    noteData: {
      currentStatus: string;
      destinationStatus: string;
      noteId: string;
      destinationIndex: number;
      currentIndex: number;
    },
    { rejectWithValue },
  ) => {
    const {
      currentStatus,
      destinationStatus,
      noteId,
      destinationIndex,
      currentIndex,
    } = noteData;

    try {
      const response = await updateNoteStatusApi({
        currentStatus,
        destinationStatus,
        noteId,
        currentIndex,
        destinationIndex,
      });
      return response;
    } catch (error: any) {
      console.error("Error updating note status:", error);
      return rejectWithValue(error?.message || "Failed to update note status.");
    }
  },
);

export const updateNote = createAsyncThunk(
  "notesManagement/updateNote",
  async (
    data: {
      noteId: string;
      title: string;
      description: string;
    },
    { rejectWithValue },
  ) => {
    try {
      const response = await updateNoteApi(data);

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const deleteNote = createAsyncThunk(
  "notesManagement/deleteNote",
  async (noteId: string, { rejectWithValue }) => {
    try {
      const response = await deleteNoteApi(noteId);

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

const notesManagementSlice = createSlice({
  name: "notesManagement",
  initialState,
  reducers: {
    updateNoteStatusLocally: (
      state,
      action: PayloadAction<{
        noteId: string;
        newStatus: string;
        sourceStatus: string;
        destinationIndex?: number;
      }>,
    ) => {
      const { noteId, newStatus, sourceStatus, destinationIndex } =
        action.payload;

      const sourceStatusObj = state.noteStatuses.find(
        (s) => s.status === sourceStatus,
      );
      if (!sourceStatusObj) return;

      const noteIndex = sourceStatusObj.notes.findIndex(
        (n: any) => n._id === noteId,
      );
      if (noteIndex === -1) return;

      const note = sourceStatusObj.notes[noteIndex];

      // Remove from source
      sourceStatusObj.notes.splice(noteIndex, 1);

      // Add to destination
      const destStatusObj = state.noteStatuses.find(
        (s) => s.status === newStatus,
      );

      if (destStatusObj) {
        if (destinationIndex !== undefined && destinationIndex >= 0) {
          destStatusObj.notes.splice(destinationIndex, 0, {
            ...note,
            status: newStatus as NoteStatusEnum,
          });
        } else {
          destStatusObj.notes.unshift({
            ...note,
            status: newStatus as NoteStatusEnum,
          });
        }
      }
    },

    reorderNotesInColumn: (
      state,
      action: PayloadAction<{
        status: string;
        dragIndex: number;
        hoverIndex: number;
      }>,
    ) => {
      const { status, dragIndex, hoverIndex } = action.payload;
      const statusObj = state.noteStatuses.find((s) => s.status === status);

      if (
        statusObj &&
        statusObj.notes.length > Math.max(dragIndex, hoverIndex)
      ) {
        const [removed] = statusObj.notes.splice(dragIndex, 1);
        statusObj.notes.splice(hoverIndex, 0, removed);
      }
    },
  },

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
      })
      .addCase(updateNoteStatus.pending, (state) => {
        state.loadingStates.updateNoteStatusLoading = true;
      })
      .addCase(updateNoteStatus.fulfilled, (state) => {
        state.loadingStates.updateNoteStatusLoading = false;
      })
      .addCase(updateNoteStatus.rejected, (state) => {
        state.loadingStates.updateNoteStatusLoading = false;
      })
      .addCase(updateNote.pending, (state) => {
        state.loadingStates.updateNoteLoading = true;
      })
      .addCase(updateNote.fulfilled, (state, action) => {
        state.loadingStates.updateNoteLoading = false;

        const updatedNote = action.payload;

        state.noteStatuses.forEach((status) => {
          const noteIndex = status.notes.findIndex(
            (note) => note._id === updatedNote._id,
          );

          if (noteIndex !== -1) {
            status.notes[noteIndex] = updatedNote;
          }
        });
      })
      .addCase(updateNote.rejected, (state) => {
        state.loadingStates.updateNoteLoading = false;
      })
      .addCase(deleteNote.pending, (state) => {
        state.loadingStates.deleteNoteLoading = true;
      })
      .addCase(deleteNote.fulfilled, (state, action) => {
        state.loadingStates.deleteNoteLoading = false;

        const deletedNote = action.payload;

        state.noteStatuses.forEach((status) => {
          status.notes = status.notes.filter(
            (note) => note._id !== deletedNote._id,
          );
        });
      })
      .addCase(deleteNote.rejected, (state) => {
        state.loadingStates.deleteNoteLoading = false;
      });
  },
});

export const { updateNoteStatusLocally, reorderNotesInColumn } =
  notesManagementSlice.actions;
export default notesManagementSlice.reducer;
