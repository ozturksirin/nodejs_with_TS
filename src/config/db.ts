import { DataSource } from "typeorm";
import { env } from "process";

export const postgresClient = new DataSource({
  type: "postgres",
  host: env.HOST,
  port: 5432,
  username: env.USERNAME,
  password: env.PASSWORD,
  database: env.DATABASE,
  synchronize: true,
  logging: true,
  entities: [],
  subscribers: [],
  migrations: [],
});
