export default class Post {
    constructor(title, img) {
        this.title = title
        this.date = new Date()
        this.img = img
    }

    toString() {
        return JSON.stringify({
            title: this.title,
            date: this.date.toJSON(),
            img: this.img
        }, null, 2)
    }
}

// function Post(title, date) {
//     this.title = title;
//     this.date = new Date();
// }

// let newPost = new Post('Webpack');
