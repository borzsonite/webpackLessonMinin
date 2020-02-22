const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
    context: path.resolve(__dirname, 'src'), // указывает путь в котором лежат исходные файлы для сборки
    mode: 'development',
    entry: {
        main: './index.js',
        analitics: './analitics.js'
    },
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: './index.html'
        }),
        new CleanWebpackPlugin(),
    ],
    module: {
        rules: [
            {   // каждый новый лоадер описывается в виде объекта {},
                test: /\.css$/, //регулярное выражение для .css файла
                use: ['style-loader', 'css-loader'] // указывает, какие лоадеры использовать
            },
            {
                test: /\.(png|jpg|svg|gif)$/,
                use: ['file-loader']
            }
        ]
    }
}