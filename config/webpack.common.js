var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var helpers = require('./helpers');

module.exports = {
  //入口点
  entry: {
    //填平浏览器的坑
    'polyfills': './src/polyfills.ts',
    //第三供应商，包括angular，bootstrap，lodash
    'vendor': './src/vendor.ts',
    //应用代码
    'app': './src/main.ts'
  },

  resolve: {
    //处理缺少扩展名的文件，会添加扩展名后查找
    extensions: ['.ts', '.js']
  },

  module: {
    //使用文件加载器的规则
    rules: [
      {
        //ts加载器
        test: /\.ts$/,
        loaders: [{
          loader: 'awesome-typescript-loader',
          options: { configFileName: helpers.root('tsconfig.json') }
        } , 'angular2-template-loader']
      },
      {
        //组件模板加载器
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        //文字字体加载器
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        loader: 'file-loader?name=assets/[name].[hash].[ext]'
      },
      {
        //应用级样式
        test: /\.css$/,
        exclude: helpers.root('src', 'app'),
        loader: ExtractTextPlugin.extract({ fallbackLoader: 'style-loader', loader: 'css-loader?sourceMap' })
      },
      {
        test: /\.scss$/,
        exclude: helpers.root('src', 'app'),
        loader: ExtractTextPlugin.extract({ fallbackLoader: 'style-loader', loader: 'css-loader?sourceMap!sass-loader?&outputStyle=expanded&sourceMap=true&sourceMapContents=true' })
      },
      {
        //组件局部样式，将其加载为字符串
        test: /\.css$/,
        include: helpers.root('src', 'app'),
        loader: 'raw-loader'
      },
      {
        test: /\.scss$/,
        include: helpers.root('src', 'app'),
        loader: 'raw-loader!sass-loader'
      }
    ]
  },

  plugins: [
    // Workaround for angular/angular#11580
    new webpack.ContextReplacementPlugin(
      // The (\\|\/) piece accounts for path separators in *nix and Windows
      /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
      helpers.root('./src'), // location of your src
      {} // a map of your routes
    ),

    //标记三个块之间的等级体系
    new webpack.optimize.CommonsChunkPlugin({
      name: ['app', 'vendor', 'polyfills']
    }),

    //自动注入js和css到主页
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    })
  ]
};
