import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
const corsOptions = {
    origin: 'http://localhost:5173',
    credientials: true
}
app.use(cors(corsOptions));

export default app;