import mongoose from "mongoose";

mongoose.connect(
  "mongodb+srv://PabloOsantos:Atmc2015@cluster0.bcuw6s6.mongodb.net/Alura-node"
);

let db = mongoose.connection;

export default db;
