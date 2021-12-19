import { DataTypes, Model } from 'sequelize';

import sequelize from '../modules/sequelize';
import { User } from './UserModel';
import { generateToken } from '../modules/utils';

export interface Session extends Model {
  token: string;
  expires: string;
  deviceInfo?: object;
  user?: User;
  userId: number;
}

export interface SessionDeviceInfo {
  ipHash: string;
  platform?: string;
  userAgent?: string;
  appVersion?: string;
  vendor?: string;
}

export const sessionModel = sequelize.define(
  'sessions',
  {
    token: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    expires: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    deviceInfo: {
      type: DataTypes.JSON,
      allowNull: true,
    },
  },
  {
    indexes: [
      { unique: true, fields: ['token'] },
      { unique: false, fields: ['userId'] },
    ],
    hooks: {
      beforeCreate({ dataValues: session }: any) {
        session.token = generateToken(null, 36);
      },
      beforeUpdate({ dataValues: session }: any) {
        session.token = generateToken(null, 36);
      },
    },
  },
);
