import { DataTypes, Model } from 'sequelize';

import sequelize from '../modules/sequelize';

export interface FileScan extends Model {
  fileUrl: string;
  scanId?: string;
  scanResult?: object;
}

export const fileScanModel = sequelize.define<FileScan>('file-scans', {
  fileUrl: {
    type: DataTypes.TEXT,
    unique: true,
    allowNull: false,
    primaryKey: true,
  },
  scanId: {
    type: DataTypes.STRING(96), // (sha256 = 64 chars) + (scan id ~ 10 chars) + buffer
    allowNull: true,
  },
  scanResult: {
    type: DataTypes.JSON,
    allowNull: true,
  },
});
