import express, { Request, Response } from "express";
import "reflect-metadata";
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
  res.send("<h3>Hello world</h3>");
});

app.use("/api", router);

const PORT: number = parseInt(process.env.PORT as string, 10) || 5000;
postgresClient
  .initialize()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
    console.log("Connected to PostgreSQL database.");
  })
  .catch((error) => {
    console.error(error);
  });
