import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import * as database from './database';
import apiRoutes from './api';
import config from './config';

const app = express();

database.connect();

// Logger to keep track of the requests
app.use(logger('dev'));

// Body-parser
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

// Application API
app.use('/api', apiRoutes);

// Did not match any method, show a 404 error...
app.use((req, res) => {
  res.status(404).send('Page not found!');
});

app.listen(config.port, () => {
  console.log('Listening on port ' + config.port + '...');
});
