import chalk from 'chalk';
import dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express';

import app from './app';

const normalizePort = (val: string) => {
  const port = parseInt(val, 10);
  if (isNaN(port)) {
    // named pipe
    return val;
  }
  if (port >= 0) {
    // port number
    return port;
  }
  return false;
};

const port = normalizePort(process.env.PORT || `3000`);
app.set('port', port);

const server = app.listen(app.get('port'), () => {
  console.log(
    '%s http://localhost:%d で動いています.',
    chalk.green('✓'),
    app.get('port')
  );
});

export default server;
