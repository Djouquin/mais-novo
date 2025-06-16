import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export async function configDB(){
   if (!process.env.DATABASE_URL) {
    throw new Error("A variável de ambiente DATABASE_URL não existe.");
  }

  await mongoose.connect(process.env.DATABASE_URL);
}