import mongoose from "mongoose";

mongoose.Schema.Types.String.set("vallidate", {
  validator: (valor) => valor !== "",
  message: ({ path }) => `O campo ${path} foi fornecido em branco`,
});
