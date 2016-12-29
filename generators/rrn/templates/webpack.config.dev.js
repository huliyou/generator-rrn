const AppInfo = require('./AppInfo');
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const cssnext = require('postcss-cssnext');
const atImport = require('postcss-import');

var NODE_ENV = process.env.NODE_ENV;

const NODE_MODULES = path.resolve(__dirname, 'node_modules');

const config = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    // 'eventsource-polyfill', // necessary for hot reloading with IE
    'babel-polyfill',
    'webpack/hot/only-dev-server',
    './src/index.web.js',
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$|\.js?$/,
        exclude: /node_modules/,
        loader: 'react-hot!babel',
      },
      {
        test: /\.css$/,
        loaders: [
          'style?sourceMap',
          <% if (useCssModules) {%>
          'css?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]',
          <%} else {%>
          'css',
          <%}%>
          'postcss-loader?sourceMap',
        ],
        exclude: /node_modules/,
      },
      <%
        var useSass = false;
        cssPreprocessors.forEach(cssPreprocessor => {
          if (cssPreprocessor === 'sass') {
            useSass = true;
          }
        });
        if (useSass) {
      %>
      {
        test: /\.scss$/,
        loaders: [
          'style?sourceMap',
          <% if (useCssModules) {%>
          'css?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]',
          <%} else {%>
          'css',
          <%}%>
          'sass?sourceMap',
        ],
        exclude: /node_modules/,
      },
      <% } %>
      <%
        var useLess = false;
        cssPreprocessors.forEach(cssPreprocessor => {
          if (cssPreprocessor === 'less') {
            useLess = true;
          }
        });
        if (useLess) {
      %>
      {
        test: /\.less$/,
        loaders: [
          'style?sourceMap',
          <% if (useCssModules) {%>
          'css?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]',
          <%} else {%>
          'css',
          <%}%>
          'less?sourceMap',
        ],
        exclude: /node_modules/,
      },
      <% } %>
      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader?limit=100000000',
      },
      {
        test: /\.svg$/,
        loader: 'babel!react-svg'
      },
    ],
  },
  postcss: function (webpack) {
    return[
      <%
        var useCssnext = false;
        cssPreprocessors.forEach(cssPreprocessor => {
          if (cssPreprocessor === 'cssnext') {
            useCssnext = true;
          }
        });
        if (useCssnext) {
      %>
      atImport({addDependencyTo: webpack, path: ["src/css"]}),
      cssnext(),
      <% } %>
      require('autoprefixer'),
    ];
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {
      'react/lib/ReactMount': 'react-dom/lib/ReactMount'
    },
  },
  output: {
    path: '/dist/',
    filename: './bundle.js',
  },
  devServer: {
    contentBase: './',
    hot: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
    port: AppInfo.port,
    host: AppInfo.host,
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
    }),
    new webpack.NoErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      title: 'drmondo',
      filename: 'index.html',
      template: 'src/template.html',
    }),
    // function() {
    //   this.plugin("done", function(stats) {
    //     var child_process = require('child_process');
    //     child_process.exec(`open http://${AppInfo.host}:${AppInfo.port}`);
    //   });
    // }
  ],
};

module.exports = config;
