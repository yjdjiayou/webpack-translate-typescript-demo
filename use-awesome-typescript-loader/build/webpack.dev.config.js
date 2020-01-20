const webpack = require('webpack');
const path = require('path');
const {smart} = require('webpack-merge');
const baseConfig = require('./webpack.base.config');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const {CheckerPlugin} = require('awesome-typescript-loader');

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
                use: [
                    {
                        loader: 'awesome-typescript-loader',
                        options: {
                            // 禁止类型检查，提高编译速度
                            transpileOnly: true
                        }
                    }
                ],
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new CheckerPlugin(),
        new FriendlyErrorsPlugin(),
        new webpack.HotModuleReplacementPlugin(),
    ],
    devServer: {
        contentBase: './',
        host: '0.0.0.0',
        disableHostCheck: true,
        useLocalIp: true,
        port: 666,
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




