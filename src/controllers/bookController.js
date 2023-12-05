import book from "../models/Livro.js";

class BookController {
  static async listBook(req, res) {
    try {
      const bookList = await book.find({});
      res.status(200).json(bookList);
    } catch (error) {
      res
        .status(500)
        .json({ message: `${error.message} - falha na requisiçáo` });
    }
  }

  static async listBookById(req, res) {
    try {
      const bookFinded = await book.findById(req.params.id);
      res.status(200).json(bookFinded);
    } catch (error) {
      res
        .status(500)
        .json({ message: `${error.message} - falha na requisiçáo` });
    }
  }

  static async createBook(req, res) {
    try {
      const newBook = await book.create(req.body);
      res
        .status(201)
        .json({ message: "Livro cadastrado com sucesso", livro: newBook });
    } catch (error) {
      res
        .status(500)
        .json({ message: `${error.message} - falha ao cadastrar livro` });
    }
  }

  static async updateBook(req, res) {
    try {
      await book.findByIdAndUpdate(req.params.id, req.body);
      res.status(200).json({ message: "Livro atualizado" });
    } catch (error) {
      res
        .status(500)
        .json({ message: `${error.message} - falha na requisiçáo` });
    }
  }

  static async deleteBook(req, res) {
    try {
      await book.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "Livro removido" });
    } catch (error) {
      res
        .status(500)
        .json({ message: `${error.message} - falha na requisiçáo` });
    }
  }
}

export default BookController;
