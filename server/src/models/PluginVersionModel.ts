import { DataTypes, Model } from 'sequelize';

import sequelize from '../modules/sequelize';

export interface PluginVersion extends Model {
  pluginId: number;
  version: string;
  changelog: string;
  downloadUrl: string;
  downloadCount: number;
  minServerVersionId: string;
  maxServerVersionId: string;
  definiteMaxServerVersion: boolean;
  plugin?: Plugin;
}

export const pluginVersionModel = sequelize.define<PluginVersion>(
  'plugin-versions',
  {
    pluginId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'plugins',
        key: 'id',
      },
    },
    version: {
      type: DataTypes.STRING(64),
      allowNull: false,
    },
    changelog: {
      type: DataTypes.TEXT,
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
    minServerVersionId: {
      type: DataTypes.STRING(64),
      allowNull: false,
      references: {
        model: 'server-versions',
        key: 'version',
      },
    },
    maxServerVersionId: {
      type: DataTypes.STRING(64),
      allowNull: false,
      references: {
        model: 'server-versions',
        key: 'version',
      },
    },
    definiteMaxServerVersion: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    indexes: [
      {
        unique: true,
        fields: ['pluginId', 'version'],
      },
    ],
  },
);
