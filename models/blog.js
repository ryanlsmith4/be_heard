//models/blog.js
//formally know as models/review.js
const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/contractor_proj', { useNewUrlParser: true});
// const mongoose = require('mongoose');


// const Blog = mongoose.model('Blog', {
//     title: String,
//     description: String,
//     articleTitle: String,
//     zip: Number,
//     comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
//
// });
//
// module.exports = Blog;

// const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BlogSchema = new Schema({
  title:    { type: String, required: true },
  description:      { type: String, required: true },
  articleTitle:  { type: String, required: true },
  zip          :   { type: Number, required: true},
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  date: {type: Date, required: true }
  // author : { type: Schema.Types.ObjectId, ref: 'User', required: true }


})

module.exports = mongoose.model('Blog', BlogSchema)
