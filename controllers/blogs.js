var Blog = require('../models/blogs');

module.exports = (app) => {
  // CREATE
  app.post('/blogs/new', (req,res) => {
    console.log(req.body)
    // INSTANTIATE instance of blog model
    var blog = new Blog(req.body);

    blog.save((err, blog) => {
        return res.redirect('/')
    })
  });
};
