import { DataTypes, Model } from 'sequelize';

import sequelize from '../modules/sequelize';
import { Plugin } from './PluginModel';

export interface ScheduledPluginDeletion extends Model {
  pluginId: number;
  deletionTime: Date;
  plugin?: Plugin;
}

export const scheduledPluginDeletionModel = sequelize.define<ScheduledPluginDeletion>(
  'scheduled-plugin-deletions',
  {
    pluginId: {
      type: DataTypes.INTEGER,
      unique: true,
      allowNull: false,
      references: {
        model: 'plugins',
        key: 'id',
      },
    },
    deletionTime: {
      type: DataTypes.DATE,
    },
  },
);
