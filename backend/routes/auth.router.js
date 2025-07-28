import Router from "express";
import dotenv from "dotenv";
import { signup,login,logout } from "../controllers/auth.controller.js";

dotenv.config();

export const authRouter = Router();

authRouter.post("/login", login);
authRouter.post("/signup", signup);
authRouter.post("/logout", logout);
