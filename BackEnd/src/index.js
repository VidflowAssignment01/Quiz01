import express from 'express';
import dotenv from "dotenv"
import connectDB from './Connection/db.js';
import cors from 'cors'
import cookieParser from 'cookie-parser';

const app = express();

dotenv.config()
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

const port=process.env.PORT

// -------------------------------- ROUTES -------------------------
import { AuthRouter } from './Routes/auth.route.js';
app.use("/api/auth",AuthRouter)



app.listen(port,()=>{
    console.log("backend chal para");
})

connectDB()
