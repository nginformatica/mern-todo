var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: './client/app.jsx',
    output: {
        path: path.join(__dirname, 'dist/public'),
        filename: 'app.js'
    },
    module: {
        loaders: [
            { 
                test: /\.jsx/,
                loader: 'babel',
                exclude: /node_modules/,
            }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    }
};