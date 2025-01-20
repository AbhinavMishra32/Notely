import { Router } from "express";
import { updateNote } from "../controller/notes.controller";

const router = Router();

router.post('/', updateNote);

export default router;