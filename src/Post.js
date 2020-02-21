export default class Post {
    constructor(title) {
        this.title = title
        this.date = new Date()
    }

    toString() {
        return JSON.stringify({
            title: this.title,
            date: this.date.toJSON(),
        })
    }
}

// function Post(title, date) {
//     this.title = title;
//     this.date = new Date();
// }

// let newPost = new Post('Webpack');
