import * as dotenv from "dotenv";
import { DataSource } from "typeorm";

dotenv.config();

const dataSource = new DataSource({
  type: "mysql",
  host: process.env.DATABASE_HOST,
  port: 3306,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  migrations: [`${__dirname}/migrations/**/*.{ts,js}`],
});

export default dataSource;
