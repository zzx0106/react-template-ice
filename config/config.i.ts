export interface IceConfig {
  /**
   * icejs 中一般不允许修改该配置
   * @default src/app.[t|j]s
   */
  entry?: string | { [key: string]: string } | string[];
  /** 在 icejs 默认配置了 { "@": "./src/" } 的规则，因此项目大多数时候不需要配置，配置完成后则可以更加简单的导入模块了： */
  alias?: {};
  /**
   * 配置 webpack 的  output.publicPath  属性。 仅在运行  build  命令时生效。
   * @default /
   */
  publicPath?: string;
  /**
   * 同 publicPath  仅在执行 start  时生效
   * @default /
   */
  devPublicPath?: string;
  /**
   * @default false
   */
  sourceMap?: boolean;
  /**
   * 将某些  import  的包排除在 bundle 之外，在运行时再去外部获取这些依赖。 比如，从 CDN 引入 React 资源，而不是将它打包
   * @doc https://webpack.js.org/configuration/externals/#externals
   * @default {}
   */
  externals?: {};

  /**
   * 如果希望构建后的资源带 hash 版本，可以将  hash  设置为  true
   * @default false
   */
  hash?: boolean | string;
  /**
   * 配置 @babel/preset-env 处理 polyfill 的逻辑，不同值的含义：
      entry: 根据配置的 browserslist 字段在每个文件开头都引入对应的 polyfill。
      false: 不引入任何 polyfill。
      usage: 根据源码中使用到的代码按需引入 polyfill。
   * @default entry
   */
  polyfill?: 'usage' | 'entry' | false;
  /**
   * 构建后的资源将进行压缩，如果不希望资源被压缩可以修改为  false
   * @default true
   */
  minify?: boolean;
  /**
   * 修改构建后的 css/js 文件目录，默认情况下 css 在  build/css/  下，js 在  build/js/  下，可以通过  outputAssetsPath  配置修改：
   * @default { js: 'js', css: 'css' }
   */
  outputAssetsPath?: object;
  /**
   * 修改构建后的文件目录
   * @default build
   */
  outputDir?: string;
  /**
   * 配置 webpack 的  devServer.proxy  属性。
   * @doc https://webpack.js.org/configuration/dev-server/#devserverproxy
   */
  proxy?: {
    [key: string]: {
      enable: boolean;
      target: string;
    };
  };
  /**
   * 注意，devServer 不支持 port 属性配置，如需改变端口，请通过命令行参数传入
   */
  devServer?: {};
  /** 配置全局变量。 */
  define?: {};
  /**
   * 配置 @babel/preset-env 的浏览器最低版本(https://babeljs.io/docs/en/babel-preset-env#targets)，新配置的 browserslist  会覆盖默认值。
   * @default last 2 versions, Firefox ESR, > 1%, ie >= 9, iOS >= 8, Android >= 4
   */
  browserslist?: {};
  /**
   * MPA 场景下配置是否生成 vendor，如果希望禁用：
   * @default true
   */
  vendor?: boolean;
  libraryTarget?: string;
  library?: string;
  libraryExport?: string;
  /**
   * 默认情况下 babel-loader 会编译相关模块以兼容 IE11。如果需要 babel 去编译 node_modules 下的指定文件，可以在这个配置快捷添加。
比如想编译 node_modules 下的 @alifd/next 依赖，可以进行如下设置：
   */
  compileDependencies?: string[];
  /**
   * 为 css-loader 提供快捷配置，将与默认配置进行浅合并。详细配置可参考 css-loader options
   * @doc https://webpack.js.org/loaders/css-loader/#options。
   */
  cssLoaderOptions?: object;
  /**
   * 为 less-loader 提供快捷配置，将与默认配置进行浅合并。详细配置可参考 less-loader options。
  ice.js 目前默认内置 less 4.x 版本，计算函数对于使用 '/' 的方式默认不进行计算，即类似使用 round(1 / 2) 的方式将报错，修复方案如下：
   * @doc https://webpack.js.org/loaders/less-loader/#options
   */
  lessLoaderOptions?: object;
  /**
   * 为 sass-loader 提供快捷配置，将与默认配置进行浅合并。详细配置可参考 sass-loader options。
   * @doc https://webpack.js.org/loaders/sass-loader/#options
   */
  sassLoaderOptions?: object;
  /**
   * 工程已内置 postcss-preset-env，配置后将自动合并其参数
   * 如果工程未内置 postcss 插件，对应配置将会添加到所以样式处理规则的 postcss-loader 配置上
   * 设置为 false 的 postcss 插件，将从配置中移除
  ```
  {
    "postcssOptions": {
      "plugins": {
        "postcss-preset-env": {
          "browsers": ["last 2 versions"]
        },
        "postcss-import": false,
        "postcss-short": { "prefix": "x" }
      },
      "syntax": "sugarss",
      "parser": "sugarss",
      "stringifier": "sugarss"
    }
  }
  ```
   */
  postcssOptions?: object;
  /**
   * 适用于需要完全重写 postcss 配置。开启配置项后，工程上将清空内置 postcss 配置，读取 postcss 配置文件 postcssrc.js 或 postcss.config.js 中的配置。
   * @default false
   */
  postcssrc?: boolean;
  /**
   * 以生产环境移除 console 为例，可以进行如下配置：
   * @doc https://github.com/terser/terser#minify-options
   */
  terserOptions?: {
    compress: {
      unused: boolean;
      drop_console: boolean;
      [key: string]: any;
    };
  };
  /**
   * 这个应该是webpack的plugins属性
   */
  plugins: any[];
  /* 为 babel-loader 的配置追加额外的 babel plugin。 */
  babelPlugins?: any[];
  /** 为 babel-loader 的配置追加额外的 babel preset。如果配置 preset 与内置相同，则优先使用 babelPresets 中的配置内容。 */
  babelPresets?: any[];
  /**
   * 开启后，在 build 构建时，将移除所有内置 html-webpack-plugin 设置，不再生成 html 文件。
   * @default false
   * undefined：即没有设置 eslint 选项，将 eslint 错误输出到终端里
  false：不检测 eslint 错误
  true：将 eslint 错误展示在预览页面上
  object：表现等同于 true，同时支持配置 eslint-loader 的更多参数
   */
  ignoreHtmlTemplate?: boolean;
  eslint?: boolean | object;
  /**
   * 禁用运行时的能力，如需关闭配置为 true 即可。
   * @default false
   */
  disableRuntime?: boolean;
  /**
   * 默认关闭 TypeScript 类型检测，如需开启配置为 true 即可。
   * @default false
   */
  tsChecker?: boolean;
  /**
   * 是否启用 DllPlugin 构建 DLL。
   * 配置为 true 时，默认为 package.json dependencies 构建 DLL。可通过 dllEntry 字段配置指定依赖。
启用该选项后，进行 Webpack 构建时，会在目录中生成 dll 文件夹，包含 dll 相关代码。
dll 构建产物无需 git 提交，建议加到 .gitignore 中。
   * @default false
   * @doc https://webpack.js.org/plugins/dll-plugin/
   */
  dll?: boolean;
  /**
   * 开启 dll 后，可通过该选项配置指定依赖。
   * @example {"react": ["react", "react-dom"]}
   * 产物如下：
```
dll // dll 构建产物文件夹
├── 7265616374.dll.js // dllEntry 中配置内容的构建产物。文件名根据 dllEntry 中键生成，此处为 react。
├── 7265616374.manifest.json // DllReferencePlugin 使用
└── dll-pkg.json // build.json 中所配置的 dllEntry 信息
```
   */
  dllEntry?: { [key: string]: string[] };
  /**
   * 通过 webpackPlugins 可以方便地新增或者修改工程上的 webpack 插件配置。
   * ```
{
  "webpackPlugins": {
    "webpack.ProvidePlugin": {
      "options": {
        "identifier": "module1"
      }
    },
    "HtmlWebpackPlugin": {
      "before": "webpack.ProvidePlugin"
    }
  }
}
   * ```
对于 webpack 内置的 plugins，可以通过 webpack.PluginName 的形式作为 key 值进行配置
对于其他 webpack 插件，需要将插件的 npm 包名作为 key 值进行配置，package.json 中需要添加并安装该插件依赖
每一项插件配置支持 before/after 用来调整 webpack 插件执行顺序
如果配置设置的插件已被添加，则修改插件配置
   */
  webpackPlugins?: object;
  /**
   * 通过 webpackLoaders 可以方便地新增或者修改工程上的 webpack loader 配置
   * ```
{
  "webpackLoaders": {
    "css": {
      "test": ".css$",
      "loaders": {
        "style-loader": {
          "options": {
            "loaderoption": true
          },
          "before": "less-loader"
        }
      }
    }
  }
}
   * ```
配置规则如下：

webpackLoaders 配置下每一项为具体的 webpack loader 规则，支持参数
test：配置类型 string|string[]，同 Rule.test
oneOf：配置类型 [oneOfName: string]: { resourceQuery: string; loaders: Loaders }，同Rule.oneOf
includeClear：清除默认 include 配置
include：配置类型 string|string[]，同 Rule.include
excludeClear：清除默认 exclude 配置
exclude：配置类型 string|string[]，同 Rule.exclude
pre：配置类型 boolean，配置 rule 的 enforce 值为 pre
post：配置类型 boolean，配置 rule 的 enforce 值为 post
before：配置类型 string，用于配置定义顺序，前置指定
after：配置类型 string，用于配置定义顺序，后置指定
loaders：配置具体的 webpack loader
loaders 参数用来指定具体 webpack loader 的参数；每一项 loader 参数支持 before/after 用来调整 webpack loader 的执行顺序；如果 loader 名已被添加，则修改插件配置
   */
  webpackLoaders?: object;
  /**
   * 开启后将按需加载运行时能力，以减小构建包体积
   * @default true
   */
  modularImportRuntime?: boolean;
  /**
   * 使用 esbuild 对构建产物进行压缩，可选配置参考 esbuild 配置文档
   * @doc https://github.com/privatenumber/esbuild-loader#minifyplugin
   */
  esbuild?: object;
}
