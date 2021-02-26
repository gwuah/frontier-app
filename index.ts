import express from 'express';
import * as dotenv from "dotenv";
import cors from "cors";
import {applicationRouter} from "./routes"
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/applications", applicationRouter);

app.listen(process.env.PORT, () => {
  console.log(`⚡️[robo-server] -> running on port ${process.env.PORT}`);
});