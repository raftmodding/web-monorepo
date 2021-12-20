import finale from 'finale-rest';
import app from './app';
import cfg from './cfg';
import sequelize from './sequelize';

export const base = `${cfg.apiBase}/rest`;

finale.initialize({ app, sequelize, base });
