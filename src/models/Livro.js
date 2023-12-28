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
    pages: {
      type: Number,
      // min: [10, "O número mínimo de páginas é 10. Valor fornecido {VALUE}"],
      // max: [1000, "O número máximo de páginas é 1000"],
      //Validação personalizada
      validate: {
        validator: (value) => {
          return value >= 10 && value <= 1000;
        },
        message:
          "O número de páginas deve estar entre 10 e 1000. Valor fornecido: {VALUE}",
      },
    },
  },
  { versionKey: false }
);

const book = mongoose.model("livros", bookSchema);

export default book;
