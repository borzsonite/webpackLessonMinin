import Post from './Post'; // расширение можно не указывать если в webpack.config.js в разделе resolve прописать extensions: ['.png', '.js', '.json'],
import './styles/style.css'
import './styles/less.less'
import './styles/sass.scss'
import json from './assets/json'
import WebpackLogo from './assets/webpack-logo'
import xml from './assets/data.xml'
import csv from '@/data.csv' // вместо пути ./assets можно укзать alias @ прописанный в webpackconfig.js
import * as $ from 'jquery'; // импортируем все из библиотеки jquery в переменную $

const post = new Post("Hello Webpack", WebpackLogo);
$('pre').addClass('code').html(post.toString())

console.log('Post to string', post.toString());
console.log('JSON:', json)
console.log('xml:', xml)
console.log('csv:', csv)