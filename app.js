let app = require('express')()

app.get('/', (req, res) => {
    res.send('Hello world!');
});

app.listen(8000, () => {
    console.log('Listening on port 8000...');
});
