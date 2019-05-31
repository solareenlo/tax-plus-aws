import chalk from 'chalk';
import dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express';
import errorHandler from 'errorhandler';

import app from './app';

if (process.env.NODE_ENV === 'development') {
  // only use in development
  app.use(errorHandler());
} else {
  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err);
    res.status(500).send('Server Error');
  });
}

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
  console.log('%s %sモードです.', chalk.green('✓'), app.get('env'));
  console.log('%s CTRL-C で停止します.', chalk.green('✓'));
});

export default server;
