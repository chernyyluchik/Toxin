const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const autoprefixer = require('autoprefixer');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');


const config = {
    context: path.resolve(__dirname, '..', 'src'),
    optimization: {
        minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
    },
    entry: './main.js',
    output: {
        filename: '[name].[hash].js',
        path: path.resolve(__dirname, '..', 'dist'),
    },

    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: 'css-loader',
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: function () {
                                return [
                                    autoprefixer({ overrideBrowserslist: ['last 2 versions'] }),
                                ];
                            },
                        },
                    },
                ],
            },
            {
                test: /\.pug$/,
                use: [
                    {
                        loader: 'pug-loader',
                        options: {
                            pretty: false
                        }
                    }]
            },
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                },
                exclude: [
                    /node_modules/
                ]
            },
            {
                test: /\.(svg|ttf|eot|woff|woff2)$/,
                loader: 'file-loader',
                exclude: [
                    /node_modules/,
                    /img/,
                ],
                options: {
                    name: 'fonts/[name]/[name].[ext]',
                    prefix: 'font'
                }
            },
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'start-page',
            filename: 'start-page.html',
            template: '../src/pages/start-page/start-page.pug',
        }),
        new HtmlWebpackPlugin({
            title: 'form-elements',
            filename: 'form-elements.html',
            template: '../src/pages/form-elements/form-elements.pug',
        }),
        new HtmlWebpackPlugin({
            title: 'cards',
            filename: 'cards.html',
            template: '../src/pages/cards/cards.pug',
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[hash].css',
        })
    ],
}

module.exports = config;