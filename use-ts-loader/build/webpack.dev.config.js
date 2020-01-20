const webpack = require('webpack');
const path = require('path');
const {smart} = require('webpack-merge');
const baseConfig = require('./webpack.base.config');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const cpus = require('os').cpus().length;
// const HappyPack = require('happypack');
// const happyThreadPool = HappyPack.ThreadPool({size: cpus});

const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = smart(baseConfig, {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    output: {
        // 开发环境下，不能使用 contenthash/chunkhash
        filename: '[name].[hash:8].js',
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: [
                    {loader: 'cache-loader'},
                    {
                        loader: 'thread-loader',
                        options: {
                            workers: cpus - 1,
                        },
                    },
                    'babel-loader',
                    {
                        loader: 'ts-loader',
                        options: {
                            // 关闭类型检查，即只进行转译
                            // 类型检查交给 fork-ts-checker-webpack-plugin 在别的线程中做
                            // transpileOnly: true,
                            // 如果设置了 happyPackMode 为 true
                            // 会隐式的设置 transpileOnly: true
                            happyPackMode: true
                            // 如果是 vue 应用，需要配置下这个
                            // appendTsSuffixTo: [/\.vue$/]
                        }
                    }
                ]
            },
        ]
    },
    plugins: [
        new FriendlyErrorsPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        // fork 一个进程进行检查
        new ForkTsCheckerWebpackPlugin({
            // async 为 false，同步的将错误信息反馈给 webpack，如果报错了，webpack 就会编译失败
            // async 默认为 true，异步的将错误信息反馈给 webpack，如果报错了，不影响 webpack 的编译
            // async: false,
            // eslint: false,
            checkSyntacticErrors: true
        })
    ],
    devServer: {
        contentBase: './',
        host: '0.0.0.0',
        disableHostCheck: true,
        useLocalIp: true,
        port: 888,
        historyApiFallback: true,
        inline: true,
        hot: true,
        overlay: {
            errors: true,
            warnings: true,
        },
        // open: true,
        // openPage:'index.html',
    }
});




