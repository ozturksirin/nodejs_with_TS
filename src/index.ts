import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import router from "./router";
import { postgresClient } from "./config/db";

const app = express();
app.use(express.json());
app.use(bodyParser.json({ limit: "30mb" }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send("<h1>Hello worl222d</h1>");
});

app.use("/api", router);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

const PORT: number = parseInt(process.env.PORT as string, 10) || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
  try {
    postgresClient;
    console.log("Connected to database.");
  } catch (error) {
    console.log(error);
  }
});
