import express from "express";
import {
  getNotes,
  getNote,
  createNote,
  updateNote,
  deleteNote,
} from "../controllers/note.controllers";

const router = express.Router();

router.get("/", getNotes);
router.get("/:noteId", getNote);
router.post("/", createNote);
router.patch("/:noteId", updateNote);
router.delete("/:noteId", deleteNote);

export default router;
