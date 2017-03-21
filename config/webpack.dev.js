var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var commonConfig = require('./webpack.common.js');
var helpers = require('./helpers');

module.exports = webpackMerge(commonConfig, {
  //设置生成sourcemaps的选项，快速生成，且与js同行显示
  devtool: 'cheap-module-eval-source-map',

  //开发服务会将包放进内存，不会写入硬盘
  output: {
    path: helpers.root('dist'),
    publicPath: 'http://localhost:8080/',
    filename: '[name].js',
    chunkFilename: '[id].chunk.js'
  },

  plugins: [
    new ExtractTextPlugin('[name].css')
  ],

  devServer: {
    //所有跳转指向index.html
    historyApiFallback: true,
    stats: 'minimal'
  }
});
