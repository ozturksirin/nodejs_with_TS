import express, { Request, Response } from "express";
import { Client } from "pg";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import router from "./router/index";
dotenv.config();
const app = express();

app.use(bodyParser.json({ limit: "30mb" }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send("<h1>trest to my API</h1>");
});

app.use("/api", router);
const PORT: number = parseInt(process.env.PORT as string, 10) || 5000;

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));

const connectionSettings = {
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DB,
  host: process.env.HOST,
  port: 5432,
};

// PostgreSQL istemci oluşturma
const client = new Client(connectionSettings);

// PostgreSQL'e bağlanma
client
  .connect()
  .then(() => {
    console.log("PostgreSQL veritabanına başarıyla bağlandı.");
    // Bağlandıktan sonra burada sorgularınızı çalıştırabilirsiniz.
    // Örnek sorgu:
    // return client.query('SELECT * FROM your_table');
  })
  .catch((err: string) => {
    console.error("PostgreSQL bağlantısı başarısız oldu:", err);
  })
  .finally(() => {
    // Bağlantıyı kapatmak için
    // client.end();
  });
