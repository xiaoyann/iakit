var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    output: {
        library: 'foundation',
        libraryTarget: 'commonjs'
    },

    module: {
        loaders: [
            {
                test: /\.js$/, 
                loader: 'babel'
            },
            {
                test: /\.(scss|css)$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader')
            },
            {
                test: /\.(?:jpg|gif|png)$/,
                loader: 'url?limit=8000'
            }
        ]
    },

    plugins: [
        new ExtractTextPlugin('foundation.css'),
        new webpack.optimize.OccurenceOrderPlugin(),
    ]
}

