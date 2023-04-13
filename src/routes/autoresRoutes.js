import express from "express";
import autoresController from "../controllers/autoresController.js";
import paginar from "../middlewares/paginar.js";

const router = express.Router();

router
  .get("/autores", autoresController.listarAutores, paginar)
  .get("/autores/:id", autoresController.listarAutorPorID)
  .post("/autores", autoresController.cadastrarAutor)
  .put("/autores/:id", autoresController.atualizarAutor)
  .delete("/autores/:id", autoresController.excluirAutor);

export default router;
