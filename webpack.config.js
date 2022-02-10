const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: {
        main: './src/index.js'
    },
    module: {
        rules: [
            {
                test: /\.(js)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.css$/i,
                include: path.resolve(__dirname, 'src'),
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
            },
        ]
    },
    resolve: {
        extensions: ['*', '.js']
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name].bundle.css'
        }),
        new HtmlWebpackPlugin({
            title: 'Output Management',
            template: 'src/index.html',
            filename: path.resolve(__dirname, 'dist/index.html')
        })
    ],
    output: {
        filename: 'js/[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true
    },
    mode: 'development'
};
