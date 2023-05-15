import { DataTypes, Model, Sequelize } from "sequelize";
import { sequelize } from "../services/connection";

interface WorkerShiftDoc extends Model {
  workershiftId: number;
  workerId: number;
  shiftId: number;
}

export const WorkerShift = sequelize.define<WorkerShiftDoc>(
  "worker-shift",
  {
    workershiftId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    workerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "workers",
        key: "id",
      },
    },
    shiftId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "shift",
        key: "id",
      },
    },
  },
  { freezeTableName: true, timestamps: false }
);
