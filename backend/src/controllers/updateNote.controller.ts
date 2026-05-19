import { Request, Response } from "express";
import Note from "../models/note.model";
import ResponseModel from "../models/response.model";
import { sendResponse } from "../utils/response.util";

export const updateNote = async (req: Request, res: Response) => {
  const response: ResponseModel = {
    statusCode: 200,
    showMessage: true,
    message: "Note updated successfully",
  };

  try {
    const { noteId } = req.query;
    const { title, description } = req.body || {};

    if (!noteId) {
      response.statusCode = 400;
      response.message = "Note ID is required";

      return sendResponse(response, res);
    }

    if (!title && !description) {
      response.statusCode = 400;
      response.message = "Title or description is required";

      return sendResponse(response, res);
    }

    const updatePayload: any = {};

    if (title) {
      updatePayload.title = title;
    }

    if (description) {
      updatePayload.description = description;
    }

    const updatedNote = await Note.findByIdAndUpdate(
      noteId,
      {
        $set: updatePayload,
      },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updatedNote) {
      response.statusCode = 404;
      response.message = "Note not found";

      return sendResponse(response, res);
    }

    response.data = updatedNote;

    return sendResponse(response, res);
  } catch (error) {
    console.log("Update Note Error:", error);

    response.statusCode = 500;
    response.message = "Internal server error";
    response.showMessage = true;
    response.error = error;

    return sendResponse(response, res);
  }
};
