import { Request, Response } from "express";
import mongoose from "mongoose";
import Note from "../models/note.model";
import NoteStatusModel from "../models/noteStatuses.model";
import ResponseModel from "../models/response.model";
import { sendResponse } from "../utils/response.util";

export const deleteNote = async (req: Request, res: Response) => {
  const response: ResponseModel = {
    statusCode: 200,
    showMessage: true,
    message: "Note deleted successfully",
  };

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const { noteId } = req.query;

    if (!noteId) {
      response.statusCode = 400;
      response.message = "Note ID is required";

      return sendResponse(response, res);
    }

    const note = await Note.findById(noteId).session(session);

    if (!note) {
      response.statusCode = 404;
      response.message = "Note not found";

      return sendResponse(response, res);
    }

    await Note.findByIdAndDelete(noteId).session(session);

    await NoteStatusModel.findOneAndUpdate(
      {
        status: note.status,
      },
      {
        $pull: {
          notes: note._id,
        },
      },
      {
        session,
      },
    );

    await session.commitTransaction();
    session.endSession();

    response.data = note;

    return sendResponse(response, res);
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    console.log("Delete Note Error:", error);

    response.statusCode = 500;
    response.message = "Internal server error";
    response.showMessage = true;
    response.error = error;

    return sendResponse(response, res);
  }
};
