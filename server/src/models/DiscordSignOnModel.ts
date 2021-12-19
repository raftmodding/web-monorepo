import { DataTypes, Model } from 'sequelize';

import sequelize from '../modules/sequelize';

export interface DiscordSignOn extends Model {
  userId: number;
  discordUserId: string;
  accessToken: string;
  refreshToken: string;
}

export const discordSignOnModel = sequelize.define('discord-sign-ons', {
  userId: {
    type: DataTypes.INTEGER,
    unique: true,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id',
    },
  },
  discordUserId: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  accessToken: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  refreshToken: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
