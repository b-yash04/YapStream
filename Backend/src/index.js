import dotenv from "dotenv";
import app from "./app";
import connectDB from "./db";

dotenv.config({
    path: './env'
})

connectDB();
