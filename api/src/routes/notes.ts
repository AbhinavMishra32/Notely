import { Router } from "express";
import { addNote, fetchNote, updateNote } from "../controller/notes.controller";

const router = Router();

router.get('/:noteId', fetchNote);
router.post('/', addNote);
router.put('/:noteId', updateNote);

export default router;