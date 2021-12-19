import { DataTypes, Model } from 'sequelize';

import sequelize from '../modules/sequelize';

export interface ServerVersion extends Model {
  version: string;
  raftVersion: string;
  timestamp: Date;
  downloadUrl: string;
  changelog?: string;
}

export const serverVersionModel = sequelize.define('server-versions', {
  version: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    primaryKey: true,
  },
  raftVersion: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  timestamp: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  downloadUrl: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  changelog: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
});
