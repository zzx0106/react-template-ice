import { IceConfig } from './config.i';
import { findSync } from './tools';
import { postcssOptions } from './postcss';
import proxy from './proxy';

const fileNames = findSync('../src/assets/global'); // 拿到global里面的所有文件路径
const cssGlobal = fileNames.map((filename) => `@import "${filename}";`.replace(/\\/g, '/')).join('');
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
  postcssOptions,
  proxy,
  plugins: [
    ['build-plugin-fusion', { themePackage: '@alifd/theme-design-pro' }],
    ['build-plugin-moment-locales', { locales: ['zh-cn'] }],
  ],
};
module.exports = config;
