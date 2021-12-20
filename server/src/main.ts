import cfg from './modules/cfg';
import sequelize from './modules/sequelize';
import './modules/modelAssociations';
import './modules/rest';
import './modules/endpoints';
import './modules/routes';
import server from './modules/server';
import { DownloadCounter } from './modules/DownloadCounter';

(async () => {
  await sequelize.sync({ force: false });

  const port = cfg.server.port;

  server.listen(port);
  server.on('error', console.error);
  server.on('listening', () => {
    // noinspection HttpUrlsUsage
    console.log('listening at http://%s:%s', 'localhost', port);
  });

  new DownloadCounter(cfg).startListening();
})();
