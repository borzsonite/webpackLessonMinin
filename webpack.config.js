const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const isDev = process.env.NODE_ENV === 'development' // определяет в коком режиме проводится сборка
console.log('isDev: ', isDev);
console.log(process.env.NODE_ENV)

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
    resolve: {
        extensions: ['.png', '.js', '.json'], // чтоб не писать расширения у файлов в index.js. Например, можно написать Post вместо Post.js
        alias: {
            "@": path.resolve(__dirname, 'src/assets')
        },
    },
    optimization: { //данная настройка позволяет избежать повтороного включения кода одних и тех же библиотек используемых в различных файлах. Например до ее применения 
        splitChunks: { // код jquery прописывался в выходных файлах analitics.js and main.js после применения настройки этот код находится в vendor.analitics.js
            chunks: 'all'
        }
    },
    devServer: {
        port: 4200,
        hot: isDev
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: './index.html'
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin(
            [
                {
                    from: path.resolve(__dirname, 'src/favicon.ico'),
                    to: path.resolve(__dirname, 'dist')
                },
            ]
        ),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css', // имя выходного файла
        }),
    ],
    module: {
        rules: [
            {   // каждый новый лоадер описывается в виде объекта {},
                test: /\.css$/, //регулярное выражение для .css файла
                // use: ['style-loader', 'css-loader'] // указывает, какие лоадеры использовать
                use: [{
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        hmr: isDev,
                        reloadAll: true
                    }
                }, 'css-loader'] // вместо 'style-loader' как  в строке выше указываем MiniCssExtractPlugin.loader чтобы писать стили в файл .css
            },
            {
                test: /\.(png|jpg|svg|gif)$/,
                use: ['file-loader']
            },
            {
                test: /\.(ttf|woff|woff2|eot)$/,
                use: ['file-loader']
            },
            {
                test: /\.xml$/,
                use: ['xml-loader']
            },
            {
                test: /\.csv$/,
                use: ['csv-loader']
            },
        ]
    }
}