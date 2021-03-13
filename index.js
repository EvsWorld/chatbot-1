import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import { config } from './config';

import routes from './routes';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.json({ extended: true }));

app.use(
  morgan(':method :url  :req[header]  |   :response-time  |  :date[web]')
);

app.use('/ping', (req, res) => {
  res.status(200).json({
    appname: 'api',
    version: process.env.npm_package_version,
    status: 'reallly good!!',
  });
});

app.use('/api/messages', routes.messages);

app.get('*', function (req, res, next) {
  const error = new Error(`${req.ip} tried to access ${req.originalUrl}`);

  error.statusCode = 301;

  next(error);
});

app.listen(config.port, (error) => {
  if (error) {
    console.log(`
    \n\n
    Server Listening!

    API:

    Status: Error
    Log: ${error}
    \n\n

    `);
  } else {
    console.log(`
    \n\n

    API server running on port ${config.port}

      \n\n
    `);
  }
});