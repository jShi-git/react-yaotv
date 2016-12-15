/**
 * 公共类库打包
 * @type {[type]}
 */
const path = require('path');
const ROOT_PATH = path.resolve(__dirname, './');
const APP_PATH = path.resolve(ROOT_PATH, 'src');
const BUILD_PATH = path.resolve(ROOT_PATH, 'dist');
const webpack = require('webpack')

module.exports = {
    entry: {
        vendor: ['react', 'react-dom', 'react-router'],
    },
    output: {
        path: BUILD_PATH,
        filename: '[name].dll.js',
        library:"[name]_lib",
    },
    plugins: [
      //js压缩
      new webpack.optimize.UglifyJsPlugin({
          compress: {
              warnings: false
          },
          except: ['$super', '$', 'exports', 'require']	//排除关键字
      }),
      // 去重
      new webpack.optimize.DedupePlugin(),
      // 生成dll
      new webpack.DllPlugin({
        path:path.join(BUILD_PATH, '[name]-manifest.json'),
        name:"[name]_lib",
      })
    ]
};
