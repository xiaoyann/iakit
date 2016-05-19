var fs = require('fs');
var path = require('path');
var webpack = require('webpack');

module.exports = {

    devtool: 'inline-source-map',

    entry: fs.readdirSync(__dirname).reduce(function(entries, dir) {
        if (fs.statSync(path.join(__dirname, dir)).isDirectory())
            entries[dir] = path.join(__dirname, dir, 'app.js')
        return entries
    }, {}),

    output: {
        path: __dirname + '/__build__',
        filename: '[name].js',
        publicPath: '/__build__/'
    },

    module: {
        loaders: [
            {
                test: /\.js$/, 
                loader: 'babel'
            },
            {
                test: /\.(scss|css)$/,
                loaders: ['style', 'css', 'sass']
            },
            {
                test: /\.(?:jpg|gif|png)$/,
                loader: 'url?limit=8000'
            }
        ]
    },

    resolve: {
        alias: {
            'foundation': path.join(__dirname, '..', 'src')
        }
    },

    plugins: [
        new webpack.optimize.CommonsChunkPlugin('lib.js')
    ],

    devServer: {
        inline: true,
        contentBase: path.resolve(__dirname, './'),
        host: '172.16.5.150'
    },
}

