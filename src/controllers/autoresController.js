import NaoEncontrado from "../erros/naoEncontrado.js";
import { autores } from "../models/index.js";

class autorController {
  static listarAutores = async (req, res, next) => {
    try {
      const autoresReultados = autores.find();

      req.resultado = autoresReultados;
      
      next();
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
        next(new NaoEncontrado("Autor não localizado"));
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

      const autorResultado = await autores.findByIdAndUpdate(id, {
        $set: req.body,
      });

      if (autorResultado !== null) {
        res.status(200).send("Atualização concluída");
      } else {
        next(new NaoEncontrado("Autor não localizado"));
      }
    } catch (erro) {
      next(erro);
    }
  };

  static excluirAutor = async (req, res, next) => {
    try {
      const id = req.params.id;

      const autorResultado = await autores.findByIdAndDelete(id);

      if (autorResultado !== null) {
        res.status(200).send({ message: "autor excluído com sucesso" });
      } else {
        next(new NaoEncontrado("Autor não localizado"));
      }
    } catch (erro) {
      next(erro);
    }
  };
}

export default autorController;
