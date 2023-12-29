import NotFound from "../errors/NotFound.js";
import { author } from "../models/index.js";

class AuthorController {
  static async listAuthor(req, res) {
    try {
      const authorList = await author.find({});
      res.status(200).json(authorList);
    } catch (error) {
      res
        .status(500)
        .json({ message: `${error.message} - falha na requisiçáo` });
    }
  }

  static async listAuthorById(req, res, next) {
    try {
      const authorFound = await author.findById(req.params.id);

      if (authorFound !== null) {
        res.status(200).json(authorFound);
      } else {
        next(new NotFound("Id do autor não localizado!"));
      }
    } catch (error) {
      next(error);
    }
  }

  static async createAuthor(req, res, next) {
    try {
      const newAuthor = await author.create(req.body);
      res
        .status(201)
        .json({ message: "Autor cadastrado com sucesso", autor: newAuthor });
    } catch (error) {
      next(error);
    }
  }

  static async updateAuthor(req, res, next) {
    try {
      const authorFound = await author.findByIdAndUpdate(
        req.params.id,
        req.body
      );

      if (authorFound !== null) {
        res.status(200).json({ message: "Autor atualizado" });
      } else {
        next(new NotFound("Id do autor não localizado!"));
      }
    } catch (error) {
      next(error);
    }
  }

  static async deleteAuthor(req, res, next) {
    try {
      const authorFound = await author.findByIdAndDelete(req.params.id);

      if (authorFound !== null) {
        res.status(200).json({ message: "Autor removido" });
      } else {
        next(new NotFound("Id do autor não localizado!"));
      }
    } catch (error) {
      next(error);
    }
  }
}

export default AuthorController;
