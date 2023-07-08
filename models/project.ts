"use strict";

//npm i sequelize-cli
//npx sequelize-cli init
//npx sequelize-cli model:generate --name Project --attributes name:string
// always add short notes for better understanding

import { Model } from "sequelize";

interface ProjectAttributes {
  id: number;
  name: string;
}
module.exports = (sequelize: any, DataTypes: any) => {
  class Project extends Model<ProjectAttributes> implements ProjectAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id!: number;
    name!: string;
    static associate(models: any) {
      // define association here
      Project.belongsToMany(models.User, { through: "ProjectAssignment" });
    }
  }
  Project.init(
    {
      id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true },
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Project",
    }
  );
  return Project;
};
