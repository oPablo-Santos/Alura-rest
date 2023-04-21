import autores from "../../models/Autor.js";

describe("Autor", () => {
  it("deve retornar um erro ao criar um autor com nome inválido", async () => {
    const autor = new autores({
      nome: "Editora Inválida",
      nacionalidade: "Brasileiro",
    });

    let error;
    try {
      await autor.save();
    } catch (err) {
      error = err;
    }

    expect(error).toBeDefined();
    expect(error.errors["nome"].message).toBe(
      "A editora Editora Inválida não é um valor permitido"
    );
  });

  it("deve retornar um erro ao criar um autor sem o campo 'nome'", async () => {
    const autor = new autores({
      nacionalidade: "Brasileiro",
    });

    let error;
    try {
      await autor.save();
    } catch (err) {
      error = err;
    }

    expect(error).toBeDefined();
    expect(error.errors["nome"].message).toBe(
      "O nome do(a) autor(a) é obrigatório"
    );
  });
});
