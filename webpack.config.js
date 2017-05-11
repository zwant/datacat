const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    'app': [
      './web/static/js/index.js'
    ]
  },
  output: {
    path: './priv/static',
    filename: 'js/app.js'
  },
  resolve: {
    moduleDirectories: [
      __dirname + '/web/static/js'
    ],
    extensions: ['', '.js'],
    alias: {
      phoenix: __dirname + '/deps/phoenix/web/static/js/phoenix.js',
      phoenix_html: __dirname + '/deps/phoenix_html/web/static/js/phoenix_html.js'
    }
  },
  module: {
    preLoaders: [
      { test: /\.js$/, loader: 'source-map-loader' },
    ],
    loaders: [
    {
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel'
    },
    {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract('style', 'css')
    },
    {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract(
          'style',
          'css!sass?includePaths[]=' + __dirname + '/node_modules'
          )
    },
    { test: /\.(png|jpg|jpeg|gif|svg)$/, loader: 'url-loader?prefix=img/&limit=5000' },
    { test: /\.(woff|woff2|ttf|eot)$/, loader: 'url-loader?prefix=font/&limit=5000' },
    ]
  },
  devtool: 'inline-source-map',
  plugins: [
    new ExtractTextPlugin('css/app.css'),
    new CopyWebpackPlugin([
        { from: './web/static/assets'},
        { from: './deps/phoenix_html/web/static/js/phoenix_html.js',
          to: 'js/phoenix_html.js'
        }
    ])
  ]
};
