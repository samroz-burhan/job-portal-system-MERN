import { Router } from "express";
import validate from "../middlewares/validate.middleware.js";

//Controllers imports
import { 
    registerUser 
} from "../controllers/auth.controller.js";


//Zod Schema Imports
import { 
    registerSchema 
} from "../validations/auth.validator.js";

const authRouter = Router();

authRouter.post(
    "/register", 
    validate(registerSchema),
    registerUser
);


export default authRouter;