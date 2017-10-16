const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const projectName = require('./package.json').name

const config = {
  entry: './src/index.js',

  output: {
    path: __dirname + '/dist',
    filename: projectName + '.js',
    library: projectName,
    libraryTarget: 'umd'
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader'
      },
      {
        test: /\.(styl|css)$/,
        loader: ExtractTextPlugin.extract({
          use: ['css-loader', 'stylus-loader']
        })
      },
      {
        test: /\.(?:jpg|gif|png)$/,
        loader: 'url?limit=8000'
      }
    ]
  },

  plugins: [
    new ExtractTextPlugin(projectName + '.css'),
  ]
}

webpack(config, (err, stats) => {
  if (err) throw err
  console.log(stats.toString({
    colors: true,
    chunks: false,
    modules: false
  }))
})
