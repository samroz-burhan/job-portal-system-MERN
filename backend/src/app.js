import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import errorHandlerMiddleware from "./middlewares/error.middleware.js";
import AppError from "./utils/AppError.js";

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

//------------------------------------------------------------------------------------

// Routes Required
import authRouter from "./routes/auth.route.js";

// Routes Used
app.use("/api/auth", authRouter);

//------------------------------------------------------------------------------------


//Unknown path route
app.use((req, res, next) => {
    next(new AppError(`Route ${req.originalUrl} not found`, 404));
});

// Centralized error middleware
app.use(errorHandlerMiddleware);


export default app;