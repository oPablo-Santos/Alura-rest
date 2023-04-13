import NaoEncontrado from "../erros/naoEncontrado.js";
import { autores, livros } from "../models/index.js";

class livroController {
  static listarLivros = async (req, res, next) => {
    try {
      const buscaLivros = livros.find();

      req.resultado = buscaLivros;
      next();
    } catch (erro) {
      next(erro);
    }
  };

  static listarLivroPorID = async (req, res, next) => {
    try {
      const id = req.params.id;

      const livrosResultados = await livros
        .findById(id)
        .populate("autor", "nome")
        .exec();

      if (livrosResultados !== null) {
        res.status(200).send(livrosResultados);
      } else {
        next(new NaoEncontrado("livro não localizado"));
      }
    } catch (erro) {
      next(erro);
    }
  };

  static cadastrarLivro = async (req, res, next) => {
    try {
      let livro = new livros(req.body);

      const livroResultado = await livro.save();

      res.status(201).send(livroResultado.toJSON());
    } catch (erro) {
      next(erro);
    }
  };

  static atualizarLivro = async (req, res, next) => {
    try {
      const id = req.params.id;

      const livroResultado = await livros.findByIdAndUpdate(id, {
        $set: req.body,
      });

      if (livroResultado !== null) {
        res.status(200).send({ message: "Livro atualizado com sucesso" });
      } else {
        next(new NaoEncontrado("Livro não localizado"));
      }
    } catch (erro) {
      next(erro);
    }
  };

  static excluirLivro = async (req, res, next) => {
    try {
      const id = req.params.id;

      const livroResultado = await livros.findByIdAndDelete(id);

      if (livroResultado !== null) {
        res.status(200).send({ message: "Livro removido com sucesso" });
      } else {
        next(new NaoEncontrado("Autor não localizado"));
      }
    } catch (erro) {
      next(erro);
    }
  };

  static listarLivroPorFiltro = async (req, res, next) => {
    try {
      const busca = await processoBusca(req.query);

      if (busca !== null) {
        const livrosResultado = livros.find(busca).populate("autor");

        req.resultado = livrosResultado;

        next();
      } else {
        res.status(200).send([]);
      }
    } catch (erro) {
      next(erro);
    }
  };
}

async function processoBusca(parametros) {
  const { editora, titulo, minPaginas, maxPaginas, nomeAutor } = parametros;
  const busca = {};

  if (editora) busca.editora = { editora };
  if (titulo) busca.titulo = { $regex: titulo, $options: "i" };

  if (minPaginas || maxPaginas) busca.nPaginas = {};

  if (minPaginas) busca.nPaginas.$gte = minPaginas;
  if (maxPaginas) busca.nPaginas.$lte = maxPaginas;

  if (nomeAutor) {
    const autor = await autores.findOne({ nome: nomeAutor });

    const autorId = autor._id;

    busca.autor = autorId;
  }

  return busca;
}

export default livroController;
