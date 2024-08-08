import * as dotenv from "dotenv";
import { DataSource } from "typeorm";

dotenv.config();

const dataSource = new DataSource({
  type: "mysql",
  host: "socialmarket-mysql",
  port: 3306,
  username: "root",
  password: "password",
  database: "socialmarket",
  migrations: [`${__dirname}/migrations/**/*.{ts,js}`],
});

export default dataSource;
