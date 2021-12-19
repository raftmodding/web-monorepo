import { DataTypes, Model } from 'sequelize';

import sequelize from '../modules/sequelize';

export interface DownloadTracker extends Model {
  ipHash: string;
  path: string;
  expiresAt: Date;
}

export const downloadTrackerModel = sequelize.define(
  'download-tracker',
  {
    ipHash: {
      type: DataTypes.STRING(32),
      allowNull: false,
    },
    path: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    expiresAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    indexes: [
      {
        unique: true,
        fields: ['ipHash', 'path'],
      },
    ],
  },
);
