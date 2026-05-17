import express from "express";
import { addNote } from "../../controllers/addNote.controller";
import authenticate from "../../middleware/auth.middleware";
import { getNoteStatuses } from "../../controllers/getNoteStatuses.controller";

const router = express.Router();

router.post(
  "/add-note",
  //  authenticate,
  addNote,
);

router.get(
  "/get-note-statuses",
  //  authenticate,
  getNoteStatuses,
);

export default router;
