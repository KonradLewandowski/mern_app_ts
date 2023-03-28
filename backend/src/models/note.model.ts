import { Schema, model, InferSchemaType } from "mongoose";

const noteSchema = new Schema(
  {
    title: { type: String, required: true },
    text: { type: String },
  },
  { timestamps: true }
);

type NoteModel = InferSchemaType<typeof noteSchema>;

export default model<NoteModel>("Note", noteSchema);
