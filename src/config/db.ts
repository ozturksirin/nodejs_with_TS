import { DataSource } from "typeorm";
import { env } from "process";
import dotenv from "dotenv";
dotenv.config();

export const postgresClient = new DataSource({
  type: "postgres",
  host: env.HOST,
  port: 5432,
  username: "postgres",
  password: env.PASSWORD,
  database: env.DATABASE,
  synchronize: true,
  logging: false, // set to true to see SQL logs
  entities: ["src/entity/**/*.ts"],
  migrations: ["src/migration/**/*.ts"],
  subscribers: ["src/subscriber/**/*.ts"],
});
