import express from "express";
import dotenv from "dotenv";
import cors from "cors";
const app = express();
app.use(express.json());
dotenv.config();

app.use(cors());

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
import registerRoute from "./routes/registerRoute";
app.use("/registration", registerRoute);

export default app;
