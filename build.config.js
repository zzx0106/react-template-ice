var config = {
    // entry: '',
    // favicon: '',
    // 打包输出目录(默认dist)
    // outputPath: 'dist'
    // webpack的publicPath(默认/)
    // publicPath: '/',
    // alias: {
    //   // '@': resolve(__dirname, '../src'), // 已经内置
    // },
    plugins: [
        ['build-plugin-fusion', { themePackage: '@alifd/theme-design-pro' }],
        ['build-plugin-moment-locales', { locales: ['zh-cn'] }],
    ]
};
module.exports = config;
