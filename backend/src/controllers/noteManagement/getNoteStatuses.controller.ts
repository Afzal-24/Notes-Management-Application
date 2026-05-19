import { Request, Response } from "express";
import ResponseModel from "../../models/response.model";
import { sendResponse } from "../../utils/response.util";
import NoteStatusModel from "../../models/noteStatuses.model";

export const getNoteStatuses = async (req: Request, res: Response) => {
  const response: ResponseModel = {
    statusCode: 200,
    showMessage: false,
    message: "Note statuses fetched successfully",
  };

  try {
    const statuses = await NoteStatusModel.find()
      .populate("notes")
      .sort({ createdAt: -1 });

    response.data = statuses;

    return sendResponse(response, res);
  } catch (error: any) {
    console.log("Get Note Statuses Error:", error);

    response.statusCode = 500;
    response.message = "Internal server error";
    response.error = error.message;

    return sendResponse(response, res);
  }
};
