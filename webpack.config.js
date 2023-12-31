const path = require('path');
const fs = require('fs');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin'); // <-- Add this line

module.exports = {
    mode: 'development',
    entry: {
        background: './src/background.js',
        popup: './src/popup.js',
    },
    output: {
        publicPath: '/',
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
            publicPath: '/',
        },
        compress: true,
        port: 8080,
        watchFiles: path.join(__dirname, 'dist', '**'),
        hot: true,
        historyApiFallback: {
            rewrites: [
                { from: /^\/$/, to: '/popup.html' },
            ]
        },
    },

    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
            },
            {
                test: require.resolve('jquery'),
                loader: 'expose-loader',
                options: {
                    exposes: ['$', 'jQuery'],
                },
            },

            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'images/',
                        },
                    },
                ],
            },
            
        ],
    },
    plugins: [
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin({
            filename: 'popup.html',
            template: './src/popup.html',
            chunks: ['popup'],
        }),

        new CopyWebpackPlugin({
            patterns: [
                { from: 'src/images', to: 'images' }
            ],
        }),
    ],
};
