import mongoose, { Schema, Document } from "mongoose";

export enum NoteStatus {
  TODO = "todo",
  IN_PROGRESS = "inProgress",
  DONE = "done",
}

export interface INote extends Document {
  title: string;
  description: string;
  status: NoteStatus;
}

const noteSchema = new Schema<INote>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    status: {
      type: String,
      enum: Object.values(NoteStatus),
      default: NoteStatus.TODO,
    },
  },
  {
    timestamps: true,
  },
);

const Note = mongoose.model<INote>("notes", noteSchema);

export default Note;
