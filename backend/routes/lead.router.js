import Router from "express";
import dotenv from "dotenv";
import { SendingDataMcp } from "../utils/SendingDataMcp.js";
import { requireAuth } from "../middlewares/auth.middleware.js";

dotenv.config();

export const leadRouter = Router();

leadRouter.post("/",requireAuth,SendingDataMcp);

