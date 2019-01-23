const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack'); //to access built-in plugins
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

const DEV_CONFIG = {
    mode: 'development',
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        hot: true,
        compress: true,
        historyApiFallback: true,
        port: 9000
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
}

const PROD_CONFIG = {
    mode: 'production',
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/bundle.css',
        })
    ]
}

module.exports = (env) => {
    const config = env === 'production' ? PROD_CONFIG : DEV_CONFIG

    config.plugins.push(
        new HtmlWebpackPlugin({
            inject: false,
            template: path.resolve(__dirname, 'src/index.html')
        })
    )

    return Object.assign(config, {
        entry: [
            './src/index.js'
        ],
        output: {
            path: path.resolve(__dirname, 'dist'),
            publicPath: '/',
            filename: 'js/bundle.js'
        },
        resolve: {
            extensions: ['.js', '.jsx']
        },
        module: {
            rules: [{
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },{
                test: /\.s?css$/,
                exclude: /node_modules/,
                // Post css loader: https://github.com/postcss/autoprefixer
                use: [
                    (env === 'production') ? MiniCssExtractPlugin.loader : 'style-loader',
                    'css-loader',
                    'postcss-loader',
                    'sass-loader'
                ]
            }]
        }
    })
}