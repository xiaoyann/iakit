var path = require('path');
var webpack = require('webpack');

var SRC_PATH = path.resolve(__dirname, './src');

module.exports = {
    entry: {
        index: SRC_PATH + '/index.js'
    }
};