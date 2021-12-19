import { DataTypes, FindOptions, ModelDefined, Optional } from 'sequelize';
import sequelize from '../modules/sequelize';
import { ModVersion } from './ModVersionModel';
import { ScheduledModDeletion } from './ScheduledModDeletionModel';
import { User } from './UserModel';

export interface ModAttributes {
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

export interface ModCreationAttributes extends Optional<ModAttributes, 'id'> {}

export const Mod: ModelDefined<
  ModAttributes,
  ModCreationAttributes
> = sequelize.define(
  'Mod',
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
    tableName: 'mods',
    hooks: {
      beforeFind(findOptions: FindOptions): void {
        const includes = Array.isArray(findOptions.include)
          ? findOptions.include
          : [findOptions.include];
        const versionsInclude =
          includes?.find((include: any) => include.as === 'versions') || null;

        if (versionsInclude) {
          findOptions.order = [['versions', 'createdAt', 'desc']];
        } else {
          findOptions.order = [['createdAt', 'desc']];
        }
      },
      beforeCreate({ dataValues: mod }: any) {
        const { description, readme } = mod;
        if (!description) {
          mod.description = '';
        }
        if (!readme) {
          mod.readme = '';
        }
      },
      beforeUpdate({ dataValues: mod }: any) {
        const { description, readme } = mod;
        if (!description) {
          mod.description = '';
        }
        if (!readme) {
          mod.readme = '';
        }
      },
    },
  },
);
