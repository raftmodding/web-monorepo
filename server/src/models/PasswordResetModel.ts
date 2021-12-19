import { DataTypes, Model } from 'sequelize';

import sequelize from '../modules/sequelize';
import { generateToken } from '../modules/utils';
import { User } from './UserModel';

export interface PasswordReset extends Model {
  userId: number;
  token: string;
  user?: User;
}

export const passwordResetModel = sequelize.define(
  'password-reset',
  {
    userId: {
      type: DataTypes.INTEGER,
      unique: true,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    hooks: {
      beforeCreate({ dataValues: passwordReset }: any) {
        passwordReset.token = generateToken();
      },
    },
  },
);
