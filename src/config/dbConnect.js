import mongoose from "mongoose";
import "dotenv/config";

mongoose.connect(
  `mongodb+srv://PabloOsantos:${process.env.keyDB}@cluster0.bcuw6s6.mongodb.net/Alura-node`
);

let db = mongoose.connection;

export default db;
