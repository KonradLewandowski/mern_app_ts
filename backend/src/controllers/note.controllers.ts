import { Request, Response, NextFunction, RequestHandler } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import NoteModel from "../models/note.model";
import createHttpError from "http-errors";
import mongoose from "mongoose";

interface NoteBody {
  title?: string;
  text?: string;
}

// eslint-disable-next-line @typescript-eslint/ban-types
const handleAsync = (fn: Function): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction): void => {
    fn(req, res, next).catch(next);
  };
};

export const getNotes: RequestHandler = handleAsync(
  async (req: Request, res: Response): Promise<void> => {
    const notes = await NoteModel.find().exec();
    res.status(200).json(notes);
  }
);

export const getNote: RequestHandler = handleAsync(
  async (req: Request, res: Response): Promise<void> => {
    const { noteId } = req.params;

    if (!mongoose.isValidObjectId(noteId)) {
      throw createHttpError(400, "Invalid note ID");
    }

    const note = await NoteModel.findById(noteId).exec();

    if (!note) {
      throw createHttpError(404, "Note not found");
    }

    res.status(200).json(note);
  }
);

export const createNote: RequestHandler<never, unknown, NoteBody> = handleAsync(
  async (
    req: Request<never, unknown, NoteBody>,
    res: Response<unknown>,
    next: NextFunction
  ): Promise<void> => {
    const { title, text } = req.body;

    if (!title) {
      throw createHttpError(400, "Note must have a title");
    }

    const newNote = await NoteModel.create({
      title,
      text,
    });
    res.status(201).json(newNote);
  }
);

interface UpdateNoteParams extends ParamsDictionary {
  noteId: string;
}

export const updateNote: RequestHandler<UpdateNoteParams, unknown, NoteBody> =
  handleAsync(async (req: Request, res: Response): Promise<void> => {
    const { noteId } = req.params;
    const { title, text } = req.body;

    if (!mongoose.isValidObjectId(noteId)) {
      throw createHttpError(400, "Invalid note ID");
    }

    const updatedNote = await NoteModel.findByIdAndUpdate(
      noteId,
      { title, text },
      { new: true }
    );

    if (!updatedNote) {
      throw createHttpError(404, "Note not found");
    }

    res.status(200).json(updatedNote);
  });

export const deleteNote: RequestHandler = handleAsync(
  async (req: Request, res: Response) => {
    const { noteId } = req.params;

    if (!mongoose.isValidObjectId(noteId)) {
      throw createHttpError(400, "Invalid note ID");
    }

    const deletedNote = await NoteModel.findByIdAndRemove(noteId);

    if (!deletedNote) {
      throw createHttpError(404, "Note not found");
    }

    res.sendStatus(200);
  }
);
