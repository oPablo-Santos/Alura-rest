import app from "../../app.js";
import request from "supertest";

let server;
beforeEach(() => {
  const port = 3000;
  server = app.listen(port);
});

afterEach(() => {
  server.close();
});

describe("GET", () => {
  it("Deve retornar uma lista de livros", async () => {
    await request(app)
      .get("/livros")
      .set("Accept", "application")
      .expect("content-type", /json/)
      .expect(200);
  });

  test("Deve retornar os autores", async () => {
    await request(app).get("/autores").expect(200);
  });
});

describe("POST", () => {
  it("Deve incluir um livro", async () => {
    await request(app)
      .post("/livros")
      .send({
        titulo: "GO para leigos",
        autor: "6413540295575a0e4989a0b9",
        editora: "Umbrella",
        nPaginas: 400,
      })
      .expect(201);
  });
});
