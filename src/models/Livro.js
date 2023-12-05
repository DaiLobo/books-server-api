import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    id: { type: mongoose.Schema.Types.ObjectId },
    title: { type: String, required: true },
    publisher: { type: String },
    author: { type: String },
    price: { type: Number },
    pages: { type: Number },
  },
  { versionKey: false }
);

const book = mongoose.model("livros", bookSchema);

export default book;
