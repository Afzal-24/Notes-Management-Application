import { Request, Response } from "express";
import Note from "../models/note.model";
import ResponseModel from "../models/response.model";
import { sendResponse } from "../utils/response.util";

export const addNote = async (req: Request, res: Response) => {
  const response: ResponseModel = {
    statusCode: 200,
    showMessage: true,
    message: "Note created successfully",
  };

  try {
    const { title, description, status } = req.body;

    if (!title || !description) {
      response.statusCode = 400;
      response.message = "Title and description are required";

      return sendResponse(response, res);
    }

    const note = await Note.create({
      title,
      description,
      status,
    });

    response.statusCode = 201;
    response.data = note;

    return sendResponse(response, res);
  } catch (error) {
    console.log("Create Note Error:", error);

    response.statusCode = 500;
    response.message = "Internal server error";
    response.error = error;

    return sendResponse(response, res);
  }
};
