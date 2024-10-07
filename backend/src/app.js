import express from 'express';
import cors from 'cors';
 
const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    optionsSuccessStatus: 200,
    credentials: true
}));

app.use(express.json({limit: "16kb"}));
app.use(express.urlencoded({extended: true, limit: "16kb"}));


//import router
import userRouter from "./routes/user.route.js"

//route declaration
app.use("/api/v1/user", userRouter)

export {app}