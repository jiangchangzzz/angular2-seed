var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var commonConfig = require('./webpack.common.js');
var helpers = require('./helpers');

const ENV = process.env.NODE_ENV = process.env.ENV = 'production';

module.exports = webpackMerge(commonConfig, {
  //在单独文件中产生sourcemaps，减慢构建速度
  devtool: 'source-map',

  output: {
    //将输入包放在dist目录下
    path: helpers.root('dist'),
    publicPath: '/',
    filename: '[name].[hash].js',
    chunkFilename: '[id].[hash].chunk.js'
  },

  plugins: [
    //出错就停止构建
    new webpack.NoEmitOnErrorsPlugin(),
    //最小化生成的包
    new webpack.optimize.UglifyJsPlugin({ 
      mangle: {
        keep_fnames: true
      }
    }),
    //将内置的css抽取为外部文件，并为文件名添加缓存无效哈希
    new ExtractTextPlugin('[name].[hash].css'),
    //定义环境变量
    new webpack.DefinePlugin({
      'process.env': {
        'ENV': JSON.stringify(ENV)
      }
    }),
    //为特定的加载器提供选项
    new webpack.LoaderOptionsPlugin({
      htmlLoader: {
        minimize: false // workaround for ng2
      }
    })
  ]
});
