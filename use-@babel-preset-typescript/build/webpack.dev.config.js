const webpack = require('webpack');
const path = require('path');
const {smart} = require('webpack-merge');
const baseConfig = require('./webpack.base.config');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');

module.exports = smart(baseConfig, {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    output: {
        // 开发环境下，不能使用 contenthash/chunkhash
        filename: '[name].[hash:8].js',
    },
    plugins: [
        new FriendlyErrorsPlugin(),
        new webpack.HotModuleReplacementPlugin(),
    ],
    devServer: {
        contentBase: './',
        host: '0.0.0.0',
        disableHostCheck: true,
        useLocalIp: true,
        port: 999,
        historyApiFallback: true,
        inline: true,
        hot: true,
        overlay: {
            errors: true,
            warnings: true,
        },
        // open: true,
        // openPage:'dist/index.html',
    }
});




