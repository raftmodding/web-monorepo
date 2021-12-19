import { DataTypes, Model } from 'sequelize';

import sequelize from '../modules/sequelize';

export interface DiscordAccountCreation extends Model {
  discordUserId: string;
  accessToken: string;
  refreshToken: string;
  token: string;
  discordUserObject: object;
}

export const discordAccountCreationModel = sequelize.define(
  'discord-account-creations',
  {
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
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    discordUserObject: {
      type: DataTypes.JSON,
      allowNull: false,
    },
  },
);
