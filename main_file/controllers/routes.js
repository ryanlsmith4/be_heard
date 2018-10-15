//controllers/routes.js
//formarlly known as controllers/reviews.js

module.exports = function(app, Blog) {
    app.get('/', (request, response) => {
        Blog.find()
          .then(blogs => {
              response.render('blogs-index', {blogs: blogs});
          })
          .catch(err => {
              console.log(err);
          });
    });

    app.get('/blogs/view/:id', (req, res) => {
        Blog.findById(req.params.id).then((blog) => {
            res.render('blogs-show', { blog: blog })
        }).catch((err) => {
            console.log(err.message);
        })
    });

    // Delete route in  views/blogs-show.handlebars POST method
    app.delete('/blogs/view/:id', function (req, res) {
        console.log("Delete Blog");
        Blog.findByIdAndRemove(req.params.id).then((blog) => {
            res.redirect('/');
        }).catch((err) => {
            console.log(err.message);
        })
    })


    app.get('/blogs/view/:id/edit', (req, res) => {
        Blog.findById(req.params.id, function(err, blog) {
            res.render('blogs-edit', { blog: blog });
        })
    })

    // Create New database object for a blog
    app.post('/blogs/view', (req, res) => {
        Blog.create(req.body).then((blog) => {
            console.log(blog);
            res.redirect(`/blogs/view/${blog._id}`); // redirect to blogs/:id
        }).catch((err) => {
            console.log(err.message);
        })
    })


    app.put('/blogs/view/:id', (req, res) => {
        Blog.findByIdAndUpdate(req.params.id, req.body)
        .then(blog => {
            res.redirect(`/blogs/view/${blog._id}`)
        })
        .catch(err => {
            console.log(err.message);
        })
    })

    app.get('/blogs', (req, res) => {
        res.render('blogs-index', {})
    })

    // Route for a new Blog
    app.get('/blogs/new', (req, res) => {
        res.render('blogs-new', {});
    })


}
