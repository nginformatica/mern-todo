import * as path from 'path';
import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import passport from 'passport';
import session from 'express-session';
import * as database from './model/database';
import * as api from './routes/api';
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
app.use(express.static(path.join(__dirname, '/public')));

// Did not match anything, then show a 404 error
app.use((req, res) => {
    res.status(404).send('Page not found!');
});

// Starting the server
app.listen(config.port, () => {
    console.log('Listening on port ' + config.port + '...');
});
