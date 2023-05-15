import { Sequelize } from "sequelize";
import express, { Application } from "express";
import bodyParser from "body-parser";
import ShiftRouter from "../routes/ShiftRoutes";
import WorkerRoutes from "../routes/WorkerRoutes";

export const expressApp = async (app: Application) => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(ShiftRouter);
  app.use(WorkerRoutes);

  return app;
};
