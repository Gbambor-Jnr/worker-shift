import { sequelize } from "../services/connection";
import { Op, Sequelize, Model, DataTypes } from "sequelize";

export enum Shift {
  first = "first",
  second = "second",
  third = "third",
}

interface ShiftDoc extends Model {
  id: number;
  selectedShift: Shift;
  shiftStartTime: number;
  shiftEndTime: number;
  shiftDay: Date;
  workerId: string;
}

// class ShiftDoc extends Model {
//   id!: number;
//   selectedShift!: Shift;
//   shiftStartTime!: number;
//   shiftEndTime!: number;
//   shiftDay!: Date;
//   workerId!: string
// }

export const Shifts = sequelize.define<ShiftDoc>(
  "shift",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    selectedShift: {
      type: DataTypes.ENUM(Shift.first, Shift.second, Shift.third),
      allowNull: false,
    },
    shiftStartTime: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    shiftEndTime: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    shiftDay: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    workerId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);

// ShiftModel.sync({ force: true });
