const path = require('path');

module.exports = {
    entry: ['babel-polyfill', 'whatwg-fetch', './client/Index.jsx'],
    output: {
        path: path.join(__dirname, 'dist/public'),
        filename: 'index.js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    }
};
