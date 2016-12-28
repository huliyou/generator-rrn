const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const cssnext = require('postcss-cssnext');
const atImport = require('postcss-import');

var NODE_ENV = process.env.NODE_ENV;

const NODE_MODULES = path.resolve(__dirname, 'node_modules');

const config = {
  devtool: 'source-map',
  entry: {
    js: [
      './src/index.js',
    ],
    vendor: [
      'react', 'react-dom', 'babel-polyfill',
    ],
  },
  // entry: [
  //   'babel-polyfill',
  //   './src/index.js',
  // ],
  module: {
    loaders: [
      // es6 code
      {
        test: /\.jsx?$|\.js?$/,
        exclude: /node_modules/,
        loader: 'babel?cacheDirectory',
        cacheable: true,
      },
      // {
      //   test: /\.css/,
      //   loader: ExtractTextPlugin.extract('style', 'css-loader?sourceMap'),
      // },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract(
          'style?sourceMap',
          'css?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]',
          'postcss-loader?sourceMap'
        ),
        exclude: /node_modules|npminstall/,
      },
      {
        test: /\.css$/,
        // include: /src\/assets\/stylesheets\/CommonStyle\/gallery.css|src\/assets\/stylesheets\/antd.css|node_modules/,
        include: /node_modules|npminstall/,
        loader: ExtractTextPlugin.extract(
          ['css']
        ),
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style',
          'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]' +
          '!autoprefixer-loader!sass-loader'
        ),
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader?limit=100000000',
      },
      {
        test: /\.svg$/,
        loader: 'babel!react-svg'
      },
    ],
    noParse: [reactPath],
  },
  postcss: function () {
    return[
      atImport({addDependencyTo: webpack, path: ["src/css"]}),
      cssnext(),
    ];
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {
    },
  },
  output: {
    path: './dist/',
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name]-[id]-[chunkhash].js',
    sourceMapFilename: '[file].map',
  },
  // output: {
  //   path: './dist/',
  //   filename: 'bundle.js',
  // },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new ExtractTextPlugin('[name].css', {
      allChunks: true,
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
      filename: 'vendor.bundle.js'
    }),
    // new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      comments: false,
      compressor: {
        warnings: false,
      },
      compress: {
        warnings: false,
      },
      sourceMap: true,
    }),
    new HtmlWebpackPlugin({
      title: 'drmondo',
      filename: 'index.html',
      template: 'src/template.html',
      minify: {
        html5: true,
        removeComments: true,
        removeEmptyAttributes: true,
        collapseInlineTagWhitespace: true,
        collapseWhitespace: true,
        minifyCSS: true,
        minifyJS: true,
        minifyURLs: true
      }
    })
  ],
};

module.exports = config;
