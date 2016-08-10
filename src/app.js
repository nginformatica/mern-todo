const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const database = require('./database');
const appRoutes = require('./routes/routes');

const app = express();
const PORT = 8000;

database.connect();

// Logger to keep track of the requests
app.use(logger('dev'));

// Body-parser
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

// Application routes
app.use(appRoutes);

// Did not match any method, show a 404 error...
app.use((req, res) => {
  res.status(404).send('Page not found!');
});

app.listen(PORT, () => {
  console.log('Listening on port ' + PORT + '...');
});
