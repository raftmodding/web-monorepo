import { DataTypes, Model } from 'sequelize';
import sequelize from '../modules/sequelize';

export interface UserPrivilege extends Model {
  username: string;
  role: string;
}

export const userPrivilegeModel = sequelize.define<UserPrivilege>(
  'user-privileges',
  {
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: false,
    },
  },
);
