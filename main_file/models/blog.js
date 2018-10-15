//models/blog.js
//formally know as models/review.js
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contractor_proj', { useNewUrlParser: true});
// const mongoose = require('mongoose');


const Blog = mongoose.model('Blog', {
    title: String,
    description: String,
    blogTitle: String,
    dropDown: Number,
});

module.exports = Blog;
