path = require('path')
const webpack = require('webpack');
const APP_DIR = path.resolve(__dirname, "./src/");


module.exports = {
  entry: {
    'app': './src/App.jsx'
  },
  output: {
    path: __dirname + '/dist',
    filename: "[name].js"
  },
  devtool: 'source-map',
  module: {
    loaders: [{
      test: /\.jsx?$/,
        include: APP_DIR,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['es2015', 'react'],
        plugins: ['transform-class-properties'],
        env: {
          development: {
            presets: ['react-hmre']
          },
          production: {
            presets: ['react']
          }
        }
      }
    },{
      test: /\.scss$/,
      loaders: ["style-loader", "css-loader", "sass-loader"]
    },
    ,{
        test: /\.css$/,
        exclude: /node_modules/,
        // loaders: ["style-loader", "css-loader", "sass-loader"]
        loaders: ['style-loader',
              {
                loader: 'css-loader',
                options: {
                  modules: true
                }
              }]
    }
    ]
  },
  watchOptions: {
    poll: 1000
  },
  devServer: {
    historyApiFallback: {
      index: '/'
    }
  }
};
