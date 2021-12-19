import { DataTypes, Model } from 'sequelize';

import sequelize from '../modules/sequelize';
import { User } from './UserModel';
import { ModVersion } from './ModVersionModel';

export interface ModBundle extends Model {
  title: string;
  description: string;
  readme: string;
  maintainerId: number;
  bannerImageUrl?: string;
  maintainer?: User;
  modContents?: ModVersion[];
}

export const modBundleModel = sequelize.define('mod-bundles', {
  title: {
    type: DataTypes.STRING(100),
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
    allowNull: true,
  },
});
