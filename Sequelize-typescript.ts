import {
  Table,
  Column,
  Model,
  DataType,
  HasMany,
  BelongsToMany,
  DefaultScope,
} from "sequelize-typescript";

//TeamPlayer.ts;

// //@Table
// export default class TeamPlayer extends Model<TeamPlayer> {
//   @BelongsTo(() => Team)
//   team: Team;

//   @ForeignKey(() => Team)
//   @PrimaryKey
//   @Column
//   teamId: number;

//   @BelongsTo(() => User)
//   user: User;

//   @ForeignKey(() => User)
//   @PrimaryKey
//   @Column
//   userId: number;

//   @Column
//   number: number;
// }
// User.ts;

// @Table
// export default class User extends Model<User> {
//   @AllowNull(false)
//   @Column
//   firstName: string;

//   @AllowNull(false)
//   @Column
//   lastName: string;

//   @HasMany(() => TeamPlayer)
//   teams: TeamPlayer[];
// }
// Team.ts;

// export default class Team extends Model<Team> {
//   @AllowNull(false)
//   @Column
//   name: string;

//   @HasMany(() => TeamPlayer)
//   players: TeamPlayer[];
// }
