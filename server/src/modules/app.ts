import { json, urlencoded } from 'body-parser';
import cors from 'cors';
import express from 'express';
import cfg from './cfg';
import router from './routes';

const app = express();
app.use(
  json({
    limit: cfg.requestSizeLimit,
  }),
);
app.use(urlencoded({ extended: false }));
app.use(cors());
app.use(cfg.apiBase, router);

export default app;
