import ErroBase from "./ErroBase.js";

class NaoEncontrado extends ErroBase {
  constructor(mensagem = "Pagina não encontrado") {
    super(mensagem, 404);
  }
}

export default NaoEncontrado;
