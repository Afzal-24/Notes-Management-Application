import mongoose from "mongoose";
import Note from "../models/note.model";
import ResponseModel from "../models/response.model";
import { sendResponse } from "../utils/response.util";
import NoteStatusModel from "../models/noteStatuses.model";

const updateNoteStatus = async (req: any, res: any) => {
  const response: ResponseModel = {
    statusCode: 200,
    showMessage: false,
    message: "Note status updated successfully",
  };

  try {
    const {
      currentStatus,
      destinationStatus,
      noteId,
      destinationIndex,
      currentIndex,
    } = req.body;

    if (!currentStatus || !destinationStatus || !noteId) {
      response.statusCode = 400;
      response.message =
        "Please provide currentStatus, destinationStatus and noteId";
      response.showMessage = true;

      return sendResponse(response, res);
    }

    // Reordering inside same column
    if (currentStatus === destinationStatus) {
      const currentStatusData = await NoteStatusModel.findOne({
        status: currentStatus,
      });

      if (!currentStatusData) {
        response.statusCode = 404;
        response.message = `Status '${currentStatus}' not found`;
        response.showMessage = true;

        return sendResponse(response, res);
      }

      const notes = [...currentStatusData.notes];

      if (currentIndex < 0 || currentIndex >= notes.length) {
        response.statusCode = 400;
        response.message = "Invalid currentIndex";
        response.showMessage = true;

        return sendResponse(response, res);
      }

      const noteObjectId = mongoose.Types.ObjectId.createFromHexString(noteId);

      // Remove from old position
      notes.splice(currentIndex, 1);

      // Add at new position
      if (destinationIndex >= 0 && destinationIndex <= notes.length) {
        notes.splice(destinationIndex, 0, noteObjectId);
      } else {
        response.statusCode = 400;
        response.message = "Invalid destinationIndex";
        response.showMessage = true;

        return sendResponse(response, res);
      }

      // Remove duplicates
      currentStatusData.notes = Array.from(new Set(notes.map(String))).map(
        (id: string) => new mongoose.Types.ObjectId(id),
      );

      await currentStatusData.save();

      response.data = currentStatusData;

      return sendResponse(response, res);
    }

    // Move between different columns
    const currentStatusData = await NoteStatusModel.findOneAndUpdate(
      {
        status: currentStatus,
      },
      {
        $pull: {
          notes: noteId,
        },
      },
      {
        new: true,
      },
    );

    const destinationStatusData = await NoteStatusModel.findOneAndUpdate(
      {
        status: destinationStatus,
        notes: { $ne: noteId },
      },
      {
        $push: {
          notes: {
            $each: [noteId],
            $position: destinationIndex,
          },
        },
      },
      {
        new: true,
      },
    );

    if (!currentStatusData || !destinationStatusData) {
      response.statusCode = 404;
      response.message = "One or both statuses not found";
      response.showMessage = true;

      return sendResponse(response, res);
    }

    const updatedNote = await Note.findByIdAndUpdate(
      noteId,
      {
        $set: {
          status: destinationStatus,
        },
      },
      {
        new: true,
      },
    );

    if (!updatedNote) {
      response.statusCode = 404;
      response.message = "Note not found";
      response.showMessage = true;

      return sendResponse(response, res);
    }

    response.message = "Note status updated successfully";

    response.data = {
      currentStatus: currentStatusData,
      destinationStatus: destinationStatusData,
      note: updatedNote,
    };

    return sendResponse(response, res);
  } catch (error) {
    console.log("Update Note Status Error:", error);

    response.statusCode = 500;
    response.message = "Failed to update note status";
    response.showMessage = true;
    response.error = error;

    return sendResponse(response, res);
  }
};

export default updateNoteStatus;
