import { join } from 'path';
import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import passport from 'passport';
import session from 'express-session';
import * as database from './model/database';
import { getRoutes } from './api';
import config from './config';
import * as auth from './auth';

const app = express();

database.connect();

// Logger to keep track of the requests
app.use(logger('dev'));

// Body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(session({
    secret: config.sessionSecret,
    resave: false,
    saveUninitialized: false
}));

// Authentication
app.use(passport.initialize());
app.use(passport.session());
auth.initialize();

// Application API
app.use('/api', api.getRoutes());

// Static font-end content
app.use(express.static(join(__dirname, '/public')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

// Starting the server
app.listen(config.port, () => {
    console.log('Listening on port ' + config.port + '...');
});
