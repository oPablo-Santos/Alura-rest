import mongoose from "mongoose";
import Livro from "../../models/Livro.js";

describe("Livro", () => {

  it("deve retornar um erro de validação se o título não for fornecido", async () => {
    const autor = new mongoose.Types.ObjectId();
    const livro = new Livro({
      autor: autor,
      editora: "Editora Teste",
      nPaginas: 200,
    });

    await expect(livro.save()).rejects.toThrow(
      "O titulo do livro é obrigatório"
    );
  });

  it("deve retornar um erro de validação se o autor não for fornecido", async () => {
    const livro = new Livro({
      titulo: "Livro de Teste",
      editora: "Editora Teste",
      nPaginas: 200,
    });

    await expect(livro.save()).rejects.toThrow("O(a) autor(a) é obrigatório");
  });

  it("deve retornar um erro de validação se a editora não for fornecida", async () => {
    const autor = new mongoose.Types.ObjectId();
    const livro = new Livro({
      titulo: "Livro de Teste",
      autor: autor,
      nPaginas: 200,
    });

    await expect(livro.save()).rejects.toThrow("A editora é obrigatória");
  });

  it("deve retornar um erro de validação se o número de páginas for menor que 10", async () => {
    const autor = new mongoose.Types.ObjectId();
    const livro = new Livro({
      titulo: "Livro de Teste",
      autor: autor,
      editora: "Editora Teste",
      nPaginas: 5,
    });

    await expect(livro.save()).rejects.toThrow(
      "O número de páginas deve estar entre 10 e 5000"
    );
  });
});
