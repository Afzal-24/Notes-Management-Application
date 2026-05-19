import { Router } from "express";
import authRouter from "./auth.route";
import notesRouter from "./notes.route";

const router = Router();

router.use("/auth", authRouter);
router.use("/notes", notesRouter);

export default router;
