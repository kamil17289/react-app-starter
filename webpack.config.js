const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DotEnv = require('dotenv-webpack');
const CssMinimizeWebpackPlugin = require('css-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = ({mode}) => {
    return {
        mode: mode,
        entry: path.resolve(__dirname, 'src/index.js'),
        output: {
            path: path.resolve(__dirname, 'public'),
            filename: '[name].bundle.js',
            publicPath: '/',
            clean: true
        },
        plugins: [
            new HtmlWebpackPlugin({template: 'src/index.html'}),
            new MiniCssExtractPlugin({
                filename: '[name].css'
            }),
            new DotEnv() // Make .env vars visible through process.env[var-name]
        ],
        optimization: {
            minimizer: [new CssMinimizeWebpackPlugin()],
            runtimeChunk: 'single'
        },
        module: {
            rules: [
                {
                    test: /\.js|jsx$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader', // Babel config in .babelrc,
                    resolve: {
                        extensions: ['.jsx', '.js'] // allow imporint JS files without extensions
                    }
                },
                {
                    test: /\.jpg|png|mp4|svg$/,
                    exclude: /node_modules/,
                    type: 'asset/resource'
                },
                {
                    test: /\.(ttf|eot|woff|woff2|svg)$/,
                    include: path.resolve(__dirname, './node_modules'),
                    type: "asset/resource",
                },
                {
                    test: /\.(scss|sass)$/,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader
                        },
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                postcssOptions: {
                                    ctx: {
                                        environment: mode
                                    },
                                    plugins: [
                                        require('autoprefixer')
                                    ]
                                }
                            }
                        },
                        'resolve-url-loader',
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true
                            }
                        }
                    ]
                },
                {
                    test: /\.css$/,
                    use: [
                        "style-loader",
                        "css-loader"
                    ]
                }
            ]
        },
        devServer: {
            static: './public',
            hot: true
        }
    };
};