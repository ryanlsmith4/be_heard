//models/blog.js
//formally know as models/review.js
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contractor_proj', {
    useNewUrlParser: true
});
const Schema = mongoose.Schema


const Blog = mongoose.model('Blog', {
    title: String,
    description: String,
    articleTitle: String,
    zip: Number,
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    // author: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'User',
    //     required: true
    // }

});

module.exports = Blog;
