import { Association, DataTypes, FindOptions, Model, Op } from 'sequelize';
import { scheduledModDeletionModel } from '.';
import sequelize from '../modules/sequelize';
import { ModVersion } from './ModVersionModel';
import { ScheduledModDeletion } from './ScheduledModDeletionModel';
import { User } from './UserModel';

export interface Mod extends Model {
  id: string;
  title: string;
  description: string;
  readme: string;
  category: string;
  author: string;
  bannerImageUrl?: string;
  iconImageUrl?: string;
  repositoryUrl?: string;
  versions?: ModVersion[];
  likes?: User[];
  deletion?: ScheduledModDeletion;
}

export const modModel = sequelize.define<Mod>(
  'mods',
  {
    id: {
      type: DataTypes.STRING(64),
      unique: true,
      allowNull: false,
      primaryKey: true,
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
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bannerImageUrl: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    iconImageUrl: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    repositoryUrl: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    hooks: {
      async beforeFind(findOptions: FindOptions): Promise<void> {
        const modsToDelete = await scheduledModDeletionModel.findAll();
        const excludedIds = modsToDelete.map(({ modId }) => modId);

        findOptions.where = {
          ...findOptions.where,
          id: { [Op.notIn]: excludedIds },
        };

        const includes = Array.isArray(findOptions.include)
          ? findOptions.include
          : [findOptions.include];
        const versionsInclude =
          includes.find(
            (include) => (include as Association).as === 'versions',
          ) || null;

        if (versionsInclude) {
          findOptions.order = [['versions', 'createdAt', 'desc']];
        } else {
          findOptions.order = [['createdAt', 'desc']];
        }
      },
    },
  },
);
