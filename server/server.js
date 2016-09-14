import * as path from 'path';
import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import passport from 'passport';
import session from 'express-session';
import config from 'config';
import * as database from './model/database';
import * as api from './routes/api';
import * as auth from './auth';

const port = config.get('port');
const sessionSecret = config.get('sessionSecret');

const app = express();

database.connect();

// Logger to keep track of the requests
app.use(logger('dev'));

// Body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(session({
    secret: sessionSecret,
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
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

// Starting the server
app.listen(port, () => {
    console.log('Listening on port ' + port + '...');
});
