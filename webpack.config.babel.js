/**
 * 开发环境配置
 * @type {[type]}
 */
const ROOT_PATH = path.resolve(__dirname, "./");
const APP_PATH = path.resolve(ROOT_PATH, 'src');
const TPL_PATH = path.resolve(APP_PATH, 'tpl');
const BUILD_PATH = path.resolve(ROOT_PATH, 'dist');
const NODEMODULE_PATH = path.join(ROOT_PATH, 'node_modules');

const isDev = !process.argv.includes('--pro');

import path from 'path';
import webpack from 'webpack';
import HappyPack from 'happypack';
import extend from 'extend';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import WebpackBrowserPlugin from 'webpack-browser-plugin';
import AssetsPlugin from 'assets-webpack-plugin';
import htmlConfig from './config/build.js';

const happyThreadPool = HappyPack.ThreadPool({size: 5});

const config = {
    entry: {
        "index": path.resolve(TPL_PATH, 'index'),
        // vendor: ['./vendor/jquery.custom.js'],
    },
    output: {
        // path: `${__dirname}/dist`,
        path: BUILD_PATH,
        // publicPath:APP_PATH,
        filename: '[name].js',
        chunkFilename: '[name].[chunkhash:5].chunk.js'
    },
    module: {
        // noParse: [/react/],
        preLoaders: [
            {
                test: /\.js(x)*$/,
                loader: 'eslint-loader',
                include: APP_PATH,
                exclude: /bundle\.js$/
            }
        ],
        loaders: [
            {
                test: /\.js(x)*$/,
                exclude: /node_modules/,
                loader: 'happypack/loader?id=jsx',
                // query: {
                //     presets: ['es2015', 'react']
                // }
            }, {
                test: /\.(le|c|sa|sc)ss$/,
                exclude: /node_modules/,
                loader: 'happypack/loader?id=style'
            }, {
                test: /\.(png|jpg)$/,
                exclude: /node_modules/,
                loader: 'happypack/loader?id=url'
            }
        ]
    },
    resolve: {
        // root:APP_PATH,
        root: [path.resolve('./node_modules')],
        modulesDirectories: ['node_modules'],
        extensions: [
            '',
            '.js',
            '.jsx',
            '.css',
            '.less',
            '.sass',
            '.scss',
            '.jpg',
            '.png'
        ],
        alias: {
            'react': path.join(NODEMODULE_PATH, "/react/dist/react.min"),
            'react-dom': path.join(NODEMODULE_PATH, "/react-dom/dist/react-dom.min")
        }
    },
    // stats: {
    //   colors: true,
    //   reasons: isDebug,
    //   hash: isVerbose,
    //   version: isVerbose,
    //   timings: true,
    //   chunks: isVerbose,
    //   chunkModules: isVerbose,
    //   cached: isVerbose,
    //   cachedAssets: isVerbose,
    // },
    //申明全局变量
    //等同声明:let $ = require('jquery')
    externals: {
        'jquery': '$'
    },
    //webpack-dev-server 配置
    devServer: {
        contentBase: ".",
        historyApiFallback: true,
        inline: true,
        hot: true,
        port: 7474,
        compress: true,
        stats: {
            colors: true
        }
    },
};

const clientConfig = extend(true, {}, config, {
  plugins: [
      //HotModuleReplacementPlugin + webpack.config.js->devServer 等同于webpack-dev-server --colors --inline --content-base . --hot
      new webpack.HotModuleReplacementPlugin(),
      //自动打开浏览器窗口
      // new WebpackBrowserPlugin(),
      //添加代码标注
      new webpack.BannerPlugin("created by chance-tech", {}),
      // 载入dll库
      new webpack.DllReferencePlugin({
          context: ROOT_PATH,
          manifest: require(path.resolve(BUILD_PATH, 'vendor-manifest.json'))
      }),
      //优化loader
      new HappyPack({id: 'jsx', loaders: ['babel?presets[]=es2015'], threadPool: happyThreadPool}),
      new HappyPack({id: 'style', loaders: ['style!css!less!sass'], threadPool: happyThreadPool}),
      new HappyPack({id: 'url', loaders: ['url?limit=25000'], threadPool: happyThreadPool}),
      new webpack.optimize.CommonsChunkPlugin({
          name: "commons", children: true, minChunks: 2,
          // filename:"commons.chunk.js",//忽略则以name为输出文件的名字，否则以此为输出文件名字
      }),
      //压缩代码
      new webpack.optimize.UglifyJsPlugin({
          compress: {
              warnings: false
          },
          except: ['$super', '$', 'exports', 'require']	//排除关键字
      }),
      // 去重
      new webpack.optimize.DedupePlugin(),
      // 生成html
      new HtmlWebpackPlugin(htmlConfig),
  ]
});

const serverConfig = extend(true, {}, config, {
  plugins: [
      //HotModuleReplacementPlugin + webpack.config.js->devServer 等同于webpack-dev-server --colors --inline --content-base . --hot
      new webpack.HotModuleReplacementPlugin(),
      //自动打开浏览器窗口
      // new WebpackBrowserPlugin(),
      //添加代码标注
      new webpack.BannerPlugin("created by chance-tech", {}),
      // 载入dll库
      new webpack.DllReferencePlugin({
          context: ROOT_PATH,
          manifest: require(path.resolve(BUILD_PATH, 'vendor-manifest.json'))
      }),
      //优化loader
      new HappyPack({id: 'jsx', loaders: ['babel?presets[]=es2015'], threadPool: happyThreadPool}),
      new HappyPack({id: 'style', loaders: ['style!css!less!sass'], threadPool: happyThreadPool}),
      new HappyPack({id: 'url', loaders: ['url?limit=25000'], threadPool: happyThreadPool}),
      new webpack.optimize.CommonsChunkPlugin({
          name: "commons", children: true, minChunks: 2,
          // filename:"commons.chunk.js",//忽略则以name为输出文件的名字，否则以此为输出文件名字
      }),
      /**
       * 上线版本使用的插件
       */
      //压缩代码
      new webpack.optimize.UglifyJsPlugin({
          compress: {
              warnings: false
          },
          except: ['$super', '$', 'exports', 'require']	//排除关键字
      }),
      // 去重
      new webpack.optimize.DedupePlugin(),
      // 生成html
      new HtmlWebpackPlugin(htmlConfig),
  ]
});

const targetConfig = isDev ? clientConfig : serverConfig;

export default targetConfig;
