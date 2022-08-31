import { InferAttributes, InferCreationAttributes, DataTypes, Model } from 'sequelize';

import {sequelize} from '../../../setup/database/connection'

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  id!: number;
  name!: string;
  createdAt!: number;
  updatedAt!: number;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize,
    modelName: 'users',
  }
);

export default User;
