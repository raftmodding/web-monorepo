import { DataTypes, Model } from 'sequelize';

import sequelize from '../modules/sequelize';
import { Mod } from './ModModel';
import { User } from './UserModel';

export interface ModLike extends Model {
  userId: number;
  modId: string;
  user?: User;
  mod?: Mod;
}

export const modLikeModel = sequelize.define<ModLike>('ModLikes', {
  userId: {
    type: DataTypes.INTEGER,
    unique: true,
    allowNull: false,
    primaryKey: true,
  },
  modId: {
    type: DataTypes.STRING(64),
    allowNull: false,
  },
});
