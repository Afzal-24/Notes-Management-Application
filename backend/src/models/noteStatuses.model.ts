import { Schema, model, Document } from "mongoose";
import { INote } from "./note.model";

export interface INoteStatus extends Document {
  status: string;
  notes: INote["_id"][];
}

const NoteStatusSchema = new Schema<INoteStatus>(
  {
    status: {
      type: String,
      required: true,
    },

    notes: [
      {
        type: Schema.Types.ObjectId,
        ref: "notes",
      },
    ],
  },
  {
    collection: "notestatuses",
  },
);

const NoteStatusModel = model<INoteStatus>("NoteStatus", NoteStatusSchema);

export default NoteStatusModel;
