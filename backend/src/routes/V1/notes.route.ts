import express from "express";
import { addNote } from "../../controllers/addNote.controller";
import authenticate from "../../middleware/auth.middleware";

const router = express.Router();

router.post(
  "/add-note",
  //  authenticate,
  addNote,
);

export default router;
