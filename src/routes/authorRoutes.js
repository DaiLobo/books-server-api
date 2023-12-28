import express from "express";
import AuthorController from "../controllers/authorController.js";

const authorRoutes = express.Router();

authorRoutes.get("/autores", AuthorController.listAuthor);
authorRoutes.get("/autores/:id", AuthorController.listAuthorById);
authorRoutes.post("/autores", AuthorController.createAuthor);
authorRoutes.put("/autores/:id", AuthorController.updateAuthor);
authorRoutes.delete("/autores/:id", AuthorController.deleteAuthor);

export default authorRoutes;
