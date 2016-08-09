let app = require('express')()
let logger = require('morgan');

app.use(logger('dev'));

app.get('/', (req, res) => {
    res.status(200).send('Hello world!');
});

// Did not match any method, show a 404 error...
app.use((req, res, next) => {
    res.status(404).send('Page not found!');
});

app.listen(8000, () => {
    console.log('Listening on port 8000...');
});
