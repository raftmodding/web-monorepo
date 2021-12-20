import bcrypt from 'bcryptjs';
import { DataTypes, Model } from 'sequelize';
import { Role } from '../modules/cfg';
import sequelize from '../modules/sequelize';
import { ModBundle } from './ModBundleModel';
import { Mod } from './ModModel';
import { Plugin } from './PluginModel';

export interface User extends Model {
  id: number;
  username: string;
  email: string;
  password: string;
  role: string;
  plugins?: Plugin[];
  modBundles?: ModBundle[];
  likedMods?: Mod[];
  isAdmin: () => boolean;
}

export const userModel = sequelize.define<User>(
  'users',
  {
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    defaultScope: {
      attributes: { exclude: ['password'] },
    },
    hooks: {
      beforeCreate: () => {
        // passwords are already hashed in AccountCreation.beforeCreate
      },
      beforeUpdate: (user: User) => {
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(user.password, salt);
      },
    },
  },
);

userModel.prototype.isAdmin = function (): boolean {
  return this.getDataValue('role') === Role.ADMIN;
};
