import "./config/envConfig";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { PORT } from "./config/env";
import db from "./config/db";



const corsOptions = {
  origin: true,
  credentials: true,
};

db();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms ")
);



app.listen(PORT, () => {
  console.log(`Running on ${PORT}`);
});
