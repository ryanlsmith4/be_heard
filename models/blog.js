// Here we use mongoose to handle the data for each blog post
const mongoose = require('mongoose');

const Schema = mongoose.Schema

const BlogSchema = new Schema({
  title:    { type: String, required: true },
  description:      { type: String, required: true },
  articleTitle:  { type: String, required: true },
  zip          :   { type: Number, required: true},
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  date: {type: Date, required: true }
  //TODO : Make author work when saving blogs
  // author : { type: Schema.Types.ObjectId, ref: 'User', required: true }


})

module.exports = mongoose.model('Blog', BlogSchema)
