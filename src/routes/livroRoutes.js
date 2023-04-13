import express from "express";
import livroController from "../controllers/livrosController.js";
import paginar from "../middlewares/paginar.js";

const router = express.Router();

router
  .get("/livros", livroController.listarLivros, paginar)
  .get("/livros/busca", livroController.listarLivroPorFiltro, paginar)
  .get("/livros/:id", livroController.listarLivroPorID)
  .post("/livros", livroController.cadastrarLivro)
  .put("/livros/:id", livroController.atualizarLivro)
  .delete("/livros/:id", livroController.excluirLivro);
export default router;
