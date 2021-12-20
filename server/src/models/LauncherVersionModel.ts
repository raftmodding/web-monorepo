import { DataTypes, Model } from 'sequelize';

import sequelize from '../modules/sequelize';

export interface LauncherVersion extends Model {
  version: string;
  timestamp: Date;
  downloadUrl: string;
  downloadCount: number;
  changelog: string;
}

export const launcherVersionModel = sequelize.define<LauncherVersion>(
  'launcher-versions',
  {
    version: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      primaryKey: true,
    },
    timestamp: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    downloadUrl: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    downloadCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    changelog: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
);
