import { book, author } from "../models/index.js";

class BookController {
  static async listBook(req, res, next) {
    try {
      const { limit = 5, pag = 1, sortBy = "title", sort = 1 } = req.query;
      const totalbooks = (await book.find({})).length;

      const bookList = await book
        .find({})
        .sort({ [sortBy]: parseInt(sort) })
        .skip((pag - 1) * limit)
        .limit(limit);

      res.status(200).json({
        list: bookList,
        pag: pag,
        totalPag: Math.ceil(totalbooks / limit),
        totalbooks,
      });
    } catch (error) {
      next(error);
      // res
      //   .status(500)
      //   .json({ message: `${error.message} - falha na requisiçáo` });
    }
  }

  static async listBookById(req, res, next) {
    try {
      const bookFinded = await book.findById(req.params.id);
      res.status(200).json(bookFinded);
    } catch (error) {
      next(error);
      // res
      //   .status(500)
      //   .json({ message: `${error.message} - falha na requisiçáo` });
    }
  }

  static async createBook(req, res, next) {
    const newBook = req.body;
    try {
      const authorFound = await author.findById(newBook.author);
      const createdBook = await book.create({
        ...newBook,
        author: { ...authorFound._doc },
      });
      res
        .status(201)
        .json({ message: "Livro cadastrado com sucesso", livro: createdBook });
    } catch (error) {
      next(error);
      // res
      //   .status(500)
      //   .json({ message: `${error.message} - falha ao cadastrar livro` });
    }
  }

  static async updateBook(req, res, next) {
    const bookId = req.params.id;
    const updatedBookData = req.body;

    try {
      const existingBook = await book.findById(bookId);
      if (!existingBook) {
        return res.status(404).json({ message: "Livro não encontrado" });
      }

      if (updatedBookData.author) {
        const authorFound = await author.findById(updatedBookData.author);

        if (authorFound) {
          existingBook.author = authorFound._doc;
        } else {
          return res.status(404).json({ message: "Autor não encontrado" });
        }
      }

      await book.findByIdAndUpdate(bookId, existingBook);
      res.status(200).json({ message: "Livro atualizado" });
    } catch (error) {
      next(error);
    }
  }

  static async deleteBook(req, res, next) {
    try {
      await book.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "Livro removido" });
    } catch (error) {
      next(error);
    }
  }

  // static async listBookByPublisher(req, res, next) {
  //   const publisher = req.query.editora;

  //   try {
  //     const bookByPublisher = await book.find({ publisher: publisher });
  //     res.status(200).json(bookByPublisher);
  //   } catch (error) {
  //     next(error);
  //   }
  // }

  static async listBookByFilter(req, res, next) {
    // const publisher = req.query.editora;

    try {
      const { publisher, title, authorName } = req.query;
      const regexTitle = new RegExp(title, "i");

      const search = {};

      if (publisher) search.publisher = { $regex: publisher, $options: "i" };
      if (title) search.title = regexTitle;

      if (authorName) {
        const authors = await book.find({
          "author.name": { $regex: authorName, $options: "i" },
        });

        res.status(200).json(authors);
        return;
      }

      const bookResult = await book.find(search);
      res.status(200).json(bookResult);
    } catch (error) {
      next(error);
    }
  }
}

export default BookController;
