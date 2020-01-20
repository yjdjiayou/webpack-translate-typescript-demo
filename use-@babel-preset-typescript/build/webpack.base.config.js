const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const SpeedMeasureWebpackPlugin = require('speed-measure-webpack-plugin');
const smw = new SpeedMeasureWebpackPlugin();
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = smw.wrap({
    context: path.resolve(__dirname, "../"),
    stats: 'errors-only',
    entry: {
        index: './src/index.ts'
    },
    module: {
        rules: [
            {
                test: /\.(tsx?)$/,
                use: ['babel-loader'],
                exclude: [/node_modules/],
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: `index.html`,
            template: `./src/index.html`,
            inject: true,
        }),
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: [path.resolve('dist')],
        }),
    ],
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.jsx'],
    }
});
