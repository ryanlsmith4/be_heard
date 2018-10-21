//TODO : this needs a general description of what it is doing.
var debug = require('../server').debug
const Comment = require('../models/comment')
const Blog = require('../models/blog')

module.exports = function(app) {


    app.post('/blogs/view/:id/comments', function(req, res) {
         currentUser: req.user
        console.log(req.body)

        const comment = new Comment(req.body)
        // SAVE INSTANCE OF Comment MODEL TO DB
        comment.save().then((comment) => {
            return Blog.findById(req.params.id)
        }).then((blog) => {
            blog.comments.unshift(comment)
            return blog.save()
        }).then((blog) => {
            res.redirect(`/blogs/view/${blog._id}`)
            currentUser: req.user

        }).catch((err) => {
            console.log(err)
        })

    })
};
