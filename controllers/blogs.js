//TODO : this needs a general description of what it is doing. 

var Blog = require('../models/blogs');

module.exports = (app) => {

  app.post('/blogs/new', (req,res) => {
    console.log(req.body)

    var blog = new Blog(req.body);

    blog.save((err, blog) => {
        return res.redirect('/')
    })
  });
};
