import { Model, DataTypes } from "sequelize";
import { sequelize } from "../services";
import { UUIDV4 } from "sequelize";

interface WorkerDoc extends Model {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  salt: string;
}

export const Workers = sequelize.define<WorkerDoc>("workers", {
  id: {
    type: DataTypes.UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
    autoIncrement: true,
  },

  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  salt: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// WorkerModel.sync({ force: true });
