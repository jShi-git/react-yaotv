/**
 * 项目发布配置
 */
 const path = require('path');
 const ROOT_PATH = path.resolve(__dirname, "../");
 const APP_PATH = path.resolve(ROOT_PATH, 'src');
 const TPL_PATH = path.resolve(APP_PATH, 'tpl');
// module.exports = {
export default {
    title: "创祀摇电视(React)",
    template: path.resolve(TPL_PATH, 'index.html'),
    filename: 'index.html',
    favicon: path.resolve(ROOT_PATH, 'public/favicon.ico'),
    inject: 'body',
    // chunks: ['index', 'about'],
    hash: true,
    minify: { //压缩HTML文件
        removeComments: true, //移除HTML中的注释
        collapseWhitespace: true //删除空白符与换行符
    }
}
