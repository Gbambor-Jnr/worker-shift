import { sequelize } from "./src/services/connection";
import { expressApp } from "./src/services";
import express from "express";
import dotenv from "dotenv";
import { Workers } from "./src/models";
import { Shifts } from "./src/models";
import { WorkerShift } from "./src/models/WorkerShift";

dotenv.config();

const PORT = process.env.PORT || 4020;

const startServer = async () => {
  const app = express();
  await expressApp(app);

  //   Shifts.belongsToMany(Workers, { through: WorkerShift });
  //   Workers.belongsToMany(Shifts, { through: WorkerShift });

  //   Workers.sync({ force: true });
  //  Shifts.sync({ force: true });

  // sequelize.sync({ force: true });

  app.listen(PORT, () => {
    console.log("connected succesfully");
  });
};

startServer();
