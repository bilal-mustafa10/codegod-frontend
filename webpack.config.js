const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const isDevelopment = process.env.NODE_ENV !== 'production';
const isContentScript = (name) => name === 'contentScript';

module.exports = {
    entry: {
        popup: path.join(__dirname, 'src', 'popup', 'index.jsx'),
        contentScript: path.join(__dirname, 'src', 'contentScript', 'index.jsx'),
        background: path.join(__dirname, 'src', 'background', 'index.jsx'),
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js',
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                        plugins: [
                            !isContentScript('contentScript') && isDevelopment && require.resolve('react-refresh/babel'),
                        ].filter(Boolean),
                    },
                },
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'src', 'popup', 'popup.html'),
            filename: 'popup.html',
            chunks: ['popup'],
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: 'src/manifest.json', to: '[name][ext]' },
                { from: 'src/contentScript/index.jsx', to: 'content_scripts' }
            ],
        }),
        !isContentScript('contentScript') && isDevelopment && new ReactRefreshWebpackPlugin(),
    ].filter(Boolean),
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    devtool: isDevelopment ? 'cheap-module-source-map' : false,
};
