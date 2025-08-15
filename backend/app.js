import dotenv from "dotenv";
dotenv.config();

import express from "express";
import authRouter from "./routes/auth.js";
import { DBConnect } from "./dbConnect.js";
import cookieParser from "cookie-parser";
import { checkAuthCookie } from "./middlewares/authMiddleware.js";

const port = process.env.PORT || 8080;
const databaseUrl = "mongodb://127.0.0.1:27017/gh";

const app = express();
DBConnect(databaseUrl);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkAuthCookie("token"));

app.get('/', async (req, res) => {
    res.send("hello");
});
app.use("/auth", authRouter);

app.listen(port, () => {
    console.log("server started");
});