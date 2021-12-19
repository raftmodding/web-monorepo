import { DataTypes, Model } from 'sequelize';

import sequelize from '../modules/sequelize';
import { PluginVersion } from './PluginVersionModel';
import { User } from './UserModel';
import { ScheduledPluginDeletion } from './ScheduledPluginDeletionModel';

export interface Plugin extends Model {
  slug: string;
  title: string;
  description: string;
  readme: string;
  maintainerId: number;
  bannerImageUrl: string;
  repositoryUrl?: string;
  versions?: PluginVersion[];
  maintainer?: User;
  deletion?: ScheduledPluginDeletion;
}

export const pluginModel = sequelize.define('plugins', {
  slug: {
    type: DataTypes.STRING(64),
    unique: true,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  readme: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  maintainerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id',
    },
  },
  bannerImageUrl: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  repositoryUrl: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
});
