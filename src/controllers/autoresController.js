import autores from "../models/Autor.js";

class autorController {
  static listarAutores = async (req, res, next) => {
    try {
      const autoresReultados = await autores.find();

      res.status(200).json(autoresReultados);
    } catch (erro) {
      next(erro);
    }
  };

  static listarAutorPorID = async (req, res, next) => {
    try {
      const id = req.params.id;

      const autoresListados = await autores.findById(id);

      if (autoresListados !== null) {
        res.status(200).send(autoresListados);
      } else {
        res.status(404).send({ message: " id do autor não encontrado" });
      }
    } catch (erro) {
      next(erro);
    }
  };

  static cadastrarAutor = async (req, res, next) => {
    try {
      let autor = new autores(req.body);

      const autorCadstrado = await autor.save();

      res.status(201).send(autorCadstrado.toJSON());
    } catch (erro) {
      next(erro);
    }
  };

  static atualizarAutor = async (req, res, next) => {
    try {
      const id = req.params.id;

      await autores.findByIdAndUpdate(id, { $set: req.body });
      res.status(200).send("Atualização concluída");
    } catch (erro) {
      next(erro);
    }
  };

  static excluirAutor = async (req, res, next) => {
    try {
      const id = req.params.id;

      await autores.findByIdAndDelete(id);
      res.status(200).send({ message: "autor excluído com sucesso" });
    } catch (erro) {
      next(erro);
    }
  };
}

export default autorController;
