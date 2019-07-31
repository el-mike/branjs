const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    background: './src/background/index.ts',
    popup: './src/popup/index.ts',
    options: './src/options/index.ts',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: 'inline-source-map',
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
          'style-loader',
          'css-loader',
          'sass-loader'
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
      filename: 'popup.html',
      template: './src/popup/index.html',
      chunks: ['popup']
    }),
    new HtmlWebpackPlugin({
      filename: 'options.html',
      template: './src/options/options.html',
      chunks: ['options']
    }),
    new CopyWebpackPlugin([
      { from: './src/assets/ext-icons', to: 'assets/ext-icons' },
      './src/manifest.json'
    ]),
    new CleanWebpackPlugin()
  ]
};
