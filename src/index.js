import Post from './Post.js';
import './styles/style.css'
import json from './assets/json'
import WebpackLogo from './assets/webpack-logo.png'

const post = new Post("Hello Webpack", WebpackLogo);
console.log('Post to string', post.toString());
console.log('JSON:', json)