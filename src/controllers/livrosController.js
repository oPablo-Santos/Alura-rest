import livros from "../models/Livro.js";

class livroController {
  static listarLivros = (req, res) => {
    livros.find((err, livros) => {
      res.status(200).json(livros);
    });
  };

  static listarLivroPorID = (req, res) => {
    const id = req.params.id;

    livros.findById(id, (err, livros) => {
      if (!err) {
        res.status(200).send(livros);
      } else {
        res
          .status(400)
          .send({ message: `${err.message} - id do livro não encontrado` });
      }
    });
  };

  static cadastrarLivro = (req, res) => {
    let livro = new livros(req.body);

    livro.save((err) => {
      if (err) {
        res
          .status(500)
          .send({ message: `${err.message} falha ao cadastrar livro` });
      } else {
        res.status(201).send(livro.toJSON());
      }
    });
  };

  static atualizarLivro = (req, res) => {
    const id = req.params.id;

    livros.findByIdAndUpdate(id, { $set: req.body }, (err) => {
      if (!err) {
        res.status(200).send("Atualização concluída");
      } else {
        res
          .status(500)
          .send({ message: `${err.message} falha ao atualizar livro` });
      }
    });
  };
}

export default livroController;
