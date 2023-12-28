import mongoose from "mongoose";
import { authorSchema } from "./Autor.js";

const bookSchema = new mongoose.Schema(
  {
    id: { type: mongoose.Schema.Types.ObjectId },
    title: {
      type: String,
      required: [true, "O título do livro é obrigatório"],
    },
    publisher: { type: String, required: [true, "A editora é obrigatória"] },
    author: { type: authorSchema, required: [true, "O autor é obrigatório"] },
    price: { type: Number },
    pages: { type: Number },
  },
  { versionKey: false }
);

const book = mongoose.model("livros", bookSchema);

export default book;
