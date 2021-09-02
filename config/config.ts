import { IceConfig } from './config.i';
import { findSync } from './tools';
import proxy from './proxy';

const fileNames = findSync('../src/assets/global'); // 拿到global里面的所有文件路径
const cssGlobal = fileNames.map((filename) => `@import "${filename}";`.replace(/\\/g, '/')).join('');
console.log('env', process.env.NODE_ENV);
const env = process.env.NODE_ENV; // production development
const isDev = env !== 'production';
const config: IceConfig = {
  devServer: {
    host: '0.0.0.0',
  },
  hash: true,
  /** DefinePlugin配置，可以配置全局公共参数 */
  define: {},
  /** 排除打包的文件，多用于cdn */
  externals: {
    // react: 'window.React',
  },
  sassLoaderOptions: {
    prependData: cssGlobal,
    sourceMap: true,
  },
  dll: isDev,
  // postcssrc: true,
  proxy,
  customWebpack: true,
  esbuild: {
    target: 'es2015',
    minify: true,
    minifyWhitespace: true, // 去除空格
    minifyIdentifiers: true, // 缩短输出文件中的标识符
    minifySyntax: true, // 在输出文件中使用等效但较短的语法
    css: true, // 是否缩小 CSS 文件
  },
  plugins: [
    ['build-plugin-fusion', { themePackage: '@alifd/theme-design-pro' }],
    // 语言包
    // ['build-plugin-moment-locales', { locales: ['zh-cn'] }],
    // 更快刷新 https://ice.work/docs/plugin/list/fast-refresh
    ['build-plugin-fast-refresh'],
    ['build-plugin-webpack5', { remoteRuntime: true }],
  ],
};
module.exports = config;
