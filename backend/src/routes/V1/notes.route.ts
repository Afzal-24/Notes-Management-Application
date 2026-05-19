import express from "express";
import * as noteController from "../../controllers/noteManagement";
import authenticate from "../../middleware/auth.middleware";

const router = express.Router();

router.post("/add-note", authenticate, noteController.addNote);

router.get("/get-note-statuses", authenticate, noteController.getNoteStatuses);

router.patch(
  "/update-note-status",
  authenticate,
  noteController.updateNoteStatus,
);

router.patch("/update-note", authenticate, noteController.updateNote);

router.delete("/delete-note", authenticate, noteController.deleteNote);

export default router;
