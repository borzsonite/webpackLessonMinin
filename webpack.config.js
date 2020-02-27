const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const isDev = process.env.NODE_ENV === 'development' // определяет в коком режиме проводится сборка
const isProd = !isDev
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const optimization = () => {
    const config = { //данная настройка позволяет избежать повтороного включения кода одних и тех же библиотек используемых в различных файлах. Например до ее применения 
        splitChunks: { // код jquery прописывался в выходных файлах analitics.js and main.js после применения настройки этот код находится в vendor.analitics.js
            chunks: 'all'
        }
    }
    if (isProd) {
        config.minimizer = [
            new OptimizeCssAssetsWebpackPlugin(),
            new TerserWebpackPlugin()
        ]
    }
    return config
}

const babelOptions = () => {
    return {
        presets: [
            "@babel/preset-env",
        ],
        plugins: ['@babel/plugin-proposal-class-properties']
    }
}
const filename = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}` //фукция принимает параметр ext и в зависимости от значение isDev возвращает имя с хешем или без
const cssLoaders = extra => {
    const loaders = [{
        loader: MiniCssExtractPlugin.loader,
        options: {
            hmr: isDev,
            reloadAll: true
        }
    }, 'css-loader']
    if (extra) loaders.push(extra);
    return loaders
}

console.log('isDev: ', isDev);
console.log(process.env.NODE_ENV)

module.exports = {
    context: path.resolve(__dirname, 'src'), // указывает путь в котором лежат исходные файлы для сборки
    mode: 'development',
    entry: {
        main: ['@babel/polyfill', './index.js'],
        analitics: './analitics.js'
    },
    output: {
        filename: filename('js'),
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: ['.png', '.js', '.json'], // чтоб не писать расширения у файлов в index.js. Например, можно написать Post вместо Post.js
        alias: {
            "@": path.resolve(__dirname, 'src/assets')
        },
    },
    optimization: optimization(),
    devServer: {
        port: 4200,
        hot: isDev
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: './index.html',
            minify: { // минификация .html файла
                collapseWhitespace: isProd,
                removeComments: isProd,
            }

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
            filename: filename('css'), // имя выходного файла
        }),
    ],
    module: {
        rules: [
            {   // каждый новый лоадер описывается в виде объекта {},
                test: /\.css$/, //регулярное выражение для .css файла
                // use: ['style-loader', 'css-loader'] // указывает, какие лоадеры использовать
                use: cssLoaders()
                // вместо 'style-loader' как  в строке выше указываем MiniCssExtractPlugin.loader чтобы писать стили в файл .css
            },
            {   // каждый новый лоадер описывается в виде объекта {},
                test: /\.less$/, //регулярное выражение для .less файла
                use: cssLoaders('less-loader')
            },
            {   // каждый новый лоадер описывается в виде объекта {},
                test: /\.s[ca]ss$/, //регулярное выражение для .sass или  .scss файла
                use: cssLoaders('sass-loader')
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
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: {
                    loader: 'babel-loader',
                    options: babelOptions()
                }
            },
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                loader: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                            '@babel/preset-typescript'
                        ],
                        plugins: ['@babel/plugin-proposal-class-properties']
                    }
                }
            },
        ]
    }
}