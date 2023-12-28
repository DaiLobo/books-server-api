import mongoose from "mongoose";

const authorSchema = new mongoose.Schema(
  {
    id: { type: mongoose.Schema.Types.ObjectId },
    name: {
      type: String,
      required: [true, "O nome do(a) autor(a) é obrigatório"],
    },
    nacionality: { type: String },
  },
  { vversionKey: false }
);

const author = mongoose.model("autores", authorSchema);

export { author, authorSchema };
