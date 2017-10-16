const path = require('path')
const webpack = require('webpack')
const Server = require('webpack-dev-server')

function parseIP() {
  var os = require('os')
  var interfaces = os.networkInterfaces()
  var IPv4 = '127.0.0.1'
  for (var key in interfaces) {
    interfaces[key].some(function(details){
      if (details.family === 'IPv4' && key === 'en0') {
        IPv4 = details.address
        return true
      }
    })
  }
  return IPv4
}

const address = `http://${parseIP()}:8080`

const config = {
  context: __dirname,
  devtool: 'source-map',
  entry: {
    alert: [
      'webpack-dev-server/client?' + address,
      './alert/app.js'
    ],
    loading: [
      'webpack-dev-server/client?' + address,
      './loading/app.js'
    ],
    toast: [
      'webpack-dev-server/client?' + address,
      './toast/app.js'
    ],
    actionSheet: [
      'webpack-dev-server/client?' + address,
      './actionsheet/app.js'
    ]
  },
  output: {
    filename: 'js/[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader'
      },
      {
        test: /\.(styl|css)$/,
        loaders: ['style-loader', 'css-loader', 'stylus-loader']
      },
      {
        test: /\.(?:jpg|gif|png)$/,
        loader: 'url-loader?limit=8000'
      }
    ]
  }
}

new Server(webpack(config), {
  stats: {
    colors: true,
    chunks: false,
    modules: false
  },
  contentBase: __dirname
})
.listen(8080, undefined, () => {
  console.log('server start at ' + address)
})
