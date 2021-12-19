import http from 'http';

import app from './app';

export default http.createServer(app);
