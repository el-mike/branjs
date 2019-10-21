const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    todoapp: './examples/todo-app/index.ts',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    port: 9000
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ['ts-loader'],
        exclude: path.resolve(__dirname, 'node_modules')
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader',
          }, 
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: function () {
                return [
                  require('autoprefixer')
                ];
              }
            }
          },
          {
            loader: 'sass-loader',
          }
        ],
        exclude: path.resolve(__dirname, 'node_modules')
      },
      {
        test: /\.html$/,
        use: ['html-loader'],
        exclude: path.resolve(__dirname, 'node_modules')
      },
      {
        test: /\.(svg|png|jpg|gif)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'assets'
          }
        },
        exclude: path.resolve(__dirname, 'node_modules')
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    plugins: [
      new TsconfigPathsPlugin({
        configFile: './tsconfig.json'
      })
    ]
  },
  watchOptions: {
    aggregateTimeout: 1000
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './examples/todo-app/index.html',
      chunks: ['todoapp']
    }),
    new CopyWebpackPlugin([]),
    new CleanWebpackPlugin()
  ]
};
