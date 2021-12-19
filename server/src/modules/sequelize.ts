import { Sequelize } from 'sequelize';
import cfg from './cfg';

const { uri, logging, ssl } = cfg.database;

const dialectOptions = {
  dialectOptions: {
    ssl: {
      require: ssl,
      rejectUnauthorized: false, // this is officially recommended this way!
    },
  },
};

export default new Sequelize(uri, {
  dialect: 'postgres',
  logging,
  ssl,
  ...(ssl ? dialectOptions : {}),
});
