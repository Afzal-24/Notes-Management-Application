import express from "express";
import { addNote } from "../../controllers/addNote.controller";
import authenticate from "../../middleware/auth.middleware";
import { getNoteStatuses } from "../../controllers/getNoteStatuses.controller";
import updateNoteStatus from "../../controllers/updateNoteStatus.controller";

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

router.patch(
  "/update-note-status",
  //  authenticate,
  updateNoteStatus,
);

export default router;
