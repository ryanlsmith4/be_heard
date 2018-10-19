const Comment = require('../models/comment')
const Blog = require('../models/blog')
module.exports = function(app) {



    // CREATE Comment
    app.post('/blogs/view/:id/comments', function(req, res) {
        console.log(req.body)
        // INSTANTIATE INSTANCE OF MODEL
        const comment = new Comment(req.body)
        // SAVE INSTANCE OF Comment MODEL TO DB
        comment.save().then((comment) => {
            return Blog.findById(req.params.id)
        }).then((blog) => {
            blog.comments.unshift(comment)
            return blog.save()
        }).then((blog) => {
            res.redirect(`/blogs/view/${blog._id}`)
        }).catch((err) => {
            console.log(err)
        })

    })
};
