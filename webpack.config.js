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
    {
      test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff'
    },
    {
      test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream'
    },
    {
      test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file'
    },
    {
      test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml'
    }
    ]
  },
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
