import http from "http"
import express from "express";
import dotenv from "dotenv";
import {leadRouter} from "./routes/lead.router.js";
import {authRouter} from "./routes/auth.router.js";
import cookieParser from "cookie-parser";


dotenv.config();
const app = express();
const server = http.createServer(app);


//MIDDLEWARE;
app.use(cookieParser());
app.use(express.json());


app.use("/api/leads", leadRouter);
app.use("/api/auth",authRouter);

server.listen(process.env.PORT || 3000, () => {
  console.log("Server is running");
});