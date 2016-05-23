var fs = require('fs');
var path = require('path');
var webpack = require('webpack');

var ip = (function() {
    var os = require('os');
    var interfaces = os.networkInterfaces();
    var IPv4 = '127.0.0.1';
    for (var key in interfaces) {
        interfaces[key].some(function(details){
            if (details.family == 'IPv4' && key == 'en0') {
                IPv4 = details.address;
                return true;
            }
        });
    }
    return IPv4;
})();


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
        host: ip
    },
}

