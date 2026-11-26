import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
const corsOptions = {
    origin: process.env.CORS_ORIGIN,
    credientials: true
}
app.use(cors(corsOptions));

// Routes Required
import authRouter from "./routes/auth.route.js";

// Routes Used
app.use("/api/auth", authRouter);


export default app;