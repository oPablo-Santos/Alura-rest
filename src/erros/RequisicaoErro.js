import ErroBase from "./ErroBase.js";

class RequisicaoIncorreta extends ErroBase {
  constructor(mensagem = "Um ou mais dedos fornecidos estão incorretos") {
    super(mensagem, 400);
  }
}

export default RequisicaoIncorreta;
