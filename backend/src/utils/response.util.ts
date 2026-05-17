import ResponseModel from "../models/response.model";
import { Response } from "express";

export function sendResponse(response: ResponseModel, res: Response) {
  res.status(response.statusCode).json(response);
}
