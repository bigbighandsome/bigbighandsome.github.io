//引入包
const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
//webpack的配置信息都写在module.exports中
module.exports = {
    //指定入口文件
    //入口
    entry: "./src/index.ts",
    //指定打包文件所在目录
    //出口
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "bundle.js",
        environment: {
            arrowFunction: false,
            const: false
        }
    },
    //指定webpack打包时要使用的模块
    module: {
        //指定要加载的规则
        rules: [
            {
                //制定规则生效的文件
                test: /\.ts$/,
                //要使用的loader
                use: [
                    {
                        //设置babel
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                [
                                    //指定环境插件
                                    '@babel/preset-env',
                                    //配置信息
                                    {
                                        //要兼容的目标浏览器
                                        targets: {
                                            "chrome": "88",
                                            "ie": "11"
                                        },
                                        //指定core的版本
                                        "corejs": "3",
                                        //使用corejs的方式
                                        "useBuiltIns": "usage"
                                    }
                                ]
                            ]
                        }
                    },
                    "ts-loader"
                ],
                //要排除的文件
                exclude: /node_modules/
            },
            //设置less文件的处理
            {
                test: /\.less$/,
                use: [
                    "style-loader",
                    "css-loader",
                    //引入postcss
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [
                                        "postcss-preset-env",
                                        {
                                            browsers: 'last 2 versions'
                                        }
                                    ]
                                ]
                            }
                        }
                    },
                    "less-loader"
                ]
            }
        ]
    },
    //配置web插件
    plugins: [
        new CleanWebpackPlugin(),
        new HTMLWebpackPlugin({
            template: './src/index.html'
        }),
    ],
    //用来设置引用模块
    resolve: {
        extensions: ['.ts', '.js']
    },
    devServer: {
        // 启动后是否自动打开浏览器
        open: true,
        //编译错误时不会更新
        hot: true,
    },
    //配置成开发模式
    mode: 'development'
}