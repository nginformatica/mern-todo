var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: [
        'webpack-dev-server/client?http://localhost:8080',
        'webpack/hot/only-dev-server',
        './client/app.jsx'
        ],
    output: {
        path: path.join(__dirname, 'dist/public'),
        filename: 'app.js'
    },
    module: {
        loaders: [
            { 
                test: /\.jsx/,
                loader: 'react-hot!babel',
                exclude: /node_modules/,
            }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    devServer: {
        contentBase: './dist/public',
        hot: true
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
};