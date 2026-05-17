import { Router } from "express";
import notesRouter from "./notes.route";

const router = Router();

router.use("/notes", notesRouter);

export default router;
