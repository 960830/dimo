//骨架屏渲染
const SkeletonWebpackPlugin = require('vue-skeleton-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
//path引入
const path = require('path')

// 是否为生产环境
const isProduction = process.env.NODE_ENV !== 'development';

// 本地环境是否需要使用cdn
const devNeedCdn = false

// cdn链接
const cdn = {
    // cdn：模块名称和模块作用域命名（对应window里面挂载的变量名称）
    externals: {
        vue: 'Vue',
        vuex: 'Vuex',
        'vue-router': 'VueRouter',
        'axios': 'axios',
        'vant': 'vant',
        'element-ui': 'ELEMENT',
    },
    // cdn的css链接
    css: [
        'https://cdn.jsdelivr.net/npm/vant@2.12/lib/index.css',
        'https://unpkg.com/element-ui/lib/theme-chalk/index.css',
    ],
    // cdn的js链接
    js: [
        'https://cdn.bootcss.com/vue/2.6.10/vue.min.js',
        'https://cdn.bootcss.com/vuex/3.1.2/vuex.min.js',
        'https://cdn.bootcss.com/vue-router/3.1.3/vue-router.min.js',
        'https://cdn.bootcss.com/axios/0.19.2/axios.min.js',
        'https://unpkg.com/element-ui/lib/index.js',
        'https://cdn.jsdelivr.net/npm/vant@2.12/lib/vant.min.js'
    ]
}


module.exports = {
    lintOnSave: false,
    publicPath: './',
    css: {
        loaderOptions: {
            postcss: {
                plugins: [
                    require('postcss-plugin-px2rem')({
                        rootValue: 40, //换算基数， 默认100  ，这样的话把根标签的字体规定为1rem为50px,这样就可以从设计稿上量出多少个px直接在代码中写多上px了。
                        // unitPrecision: 5, //允许REM单位增长到的十进制数字。
                        //propWhiteList: [],  //默认值是一个空数组，这意味着禁用白名单并启用所有属性。
                        // propBlackList: [], //黑名单
                        // exclude: /(page_pc)/i,  //默认false，可以（reg）利用正则表达式排除某些文件夹的方法，例如/(node_module)/ 。如果想把前端UI框架内的px也转换成rem，请把此属性设为默认值
                        exclude: /node_modules/i,
                        // selectorBlackList: ['van-'], //要忽略并保留为px的选择器,我们一般不转换vantui中的大小
                        // ignoreIdentifier: false,  //（boolean/string）忽略单个属性的方法，启用ignoreidentifier后，replace将自动设置为true。
                        // replace: true, // （布尔值）替换包含REM的规则，而不是添加回退。
                        mediaQuery: false,  //（布尔值）允许在媒体查询中转换px。
                        minPixelValue: 3 //设置要替换的最小像素值(3px会被转rem)。 默认 0
                    }),
                ]
            }
        }
    },
    productionSourceMap: false, //不输出map文件
    chainWebpack: config => {
        // ============注入cdn start============
        config.plugin('html').tap(args => {
            // 生产环境或本地需要cdn时，才注入cdn
            if (isProduction || devNeedCdn) args[0].cdn = cdn
            return args
        })
        // ============注入cdn start============
    },
    configureWebpack: config => {
        // 用cdn方式引入，则构建时要忽略相关资源
        if (isProduction || devNeedCdn) config.externals = cdn.externals

        // 代码压缩
        config.plugins.push(
            new UglifyJsPlugin({
                uglifyOptions: {
                    //生产环境自动删除console
                    compress: {
                        drop_debugger: true,
                        drop_console: true,
                        pure_funcs: ['console.log']
                    }
                },
                sourceMap: false,
                parallel: true
            })
        )
        // 公共代码抽离
        config.optimization = {
            splitChunks: {
                cacheGroups: {
                    vendor: {
                        chunks: 'all',
                        test: /node_modules/,
                        name: 'vendor',
                        minChunks: 1,
                        maxInitialRequests: 5,
                        minSize: 0,
                        priority: 100
                    },
                    common: {
                        chunks: 'all',
                        test: /[\\/]src[\\/]js[\\/]/,
                        name: 'common',
                        minChunks: 2,
                        maxInitialRequests: 5,
                        minSize: 0,
                        priority: 60
                    },
                    styles: {
                        name: 'styles',
                        test: /\.(sa|sc|c)ss$/,
                        chunks: 'all',
                        enforce: true
                    },
                    runtimeChunk: {
                        name: 'manifest'
                    }
                }
            }
        }
        // 骨架屏渲染
        config.plugins.push(new SkeletonWebpackPlugin({
            webpackConfig: {
                entry: {
                    app: path.join(__dirname, './src/Skeleton/index.js'),
                },
            },
            minimize: true,
            quiet: true,
            // 如果不设置那么所有的路由都会共享这个骨架屏组件
            router: {
                mode: 'hash',
                // 给对应的路由设置对应的骨架屏组件，skeletonId的值根据组件设置的id
                routes: [
                    { path: '/list', skeletonId: 'skeleton' }
                ]
            }
        }))
    }
}

//1.49Mb
//1.37Mb
//1.37mb

