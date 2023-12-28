import express from "express";
import connectDataBase from "./config/dbConnect.js";
import routes from "./routes/index.js";
import errorManipulate from "./middlewares/errorManipulate.js";

const connection = await connectDataBase();

connection.on("error", (erro) => {
  console.error(erro);
});

connection.once("open", () => {
  console.log("Conexão feita com sucesso");
});

const app = express();
routes(app);

app.use(errorManipulate);
// app.use(express.json());

// app.get("/", (req, res) => {
//   res.status(200).send("Curso de nodejs");
// });

// app.get("/livros", async (req, res) => {
//   const bookList = await book.find({});
//   res.status(200).json(bookList);
// });

// app.get("/livros/:id", (req, res) => {
//   const index = getBookById(req.params.id);
//   res.status(200).json(livros[index]);
// });

// app.post("/livros", (req, res) => {
//   livros.push(req.body);
//   res.status(201).send("Livro cadastrado com sucesso");
// });

// app.put("/livros/:id", (req, res) => {
//   const index = getBookById(req.params.id);
//   livros[index].nome = req.body.nome;

//   res.status(200).send(livros);
// });

// app.delete("/livros/:id", (req, res) => {
//   const index = getBookById(req.params.id);
//   livros.splice(index, 1);

//   res.status(200).send("Livro removido");
// });

export default app;
