import mongoose from "mongoose";

const autorSchema = new mongoose.Schema(
  {
    id: { type: String },
    nome: {
      type: String,
      required: [true, "O nome do(a) autor(a) é obrigatório"],
      enum: {
        values: ["A casa do código", "Alura", "Umbrella", "Papel e Pedra"],
        message: "A editora {VALUE} não é um valor permitido",
      },
    },
    nacionalidade: { type: String },
  },
  {
    versionKey: false,
  }
);

const autores = mongoose.model("autores", autorSchema);

export default autores;
