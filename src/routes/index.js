import express from "express";
import bookRoutes from "./bookRoutes.js";

const routes = (app) => {
  app.route("/").get((req, res) => {
    res.status(200).send("Curso nodejs");
  });

  app.use(express.json(), bookRoutes);
};

export default routes;
