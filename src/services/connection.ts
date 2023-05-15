import { Sequelize } from "sequelize";

import dotenv from "dotenv";

dotenv.config();
const databaseName = process.env.DB_NAME;
const user = process.env.DB_USERNAME;
const host = process.env.HOST;
const pwd = process.env.DB_PASSWORD;

if (!databaseName || !user) {
  throw new Error("Environmental variables not set");
}

export const sequelize = new Sequelize(databaseName, user, pwd, {
  host: host,
  dialect: "mysql",
});
