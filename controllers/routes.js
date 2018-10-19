//controllers/routes.js
//formarlly known as controllers/reviews.js
const NewsAPI = require('newsapi');
// import apiConfig from './config';
const config = require('../.env')
const newsapi = new NewsAPI(config.config)
const User = require('../models/user')

const currentDate = new Date();
// Super Excellent Date tool!
const date = currentDate.getDate();
const month = currentDate.getMonth(); //Be careful! January is 0 not 1
const year = currentDate.getFullYear();
const dateStringLessAMonth = year + "-" + (month - 1) + "-" + date;
const dateString = year + "-" + month + "-" + date;


module.exports = function(app, Blog) {
    require('./auth')(app)

    app.get('/blogs/views/community/board', (req, res) => {
        let currentUser = req.user;
        Blog.find()
            .then(blogs => {
                res.render('blogs-index', {
                    blogs: blogs,
                    currentUser
                });
            })
            .catch(err => {
                console.log(err);
            });
    });

    //Route to get National News Pages
    app.get('/blogs/views/world', (req, res) => {
        newsapi.v2.everything({
            q: '+world, +politics ',
            sources: 'google-news, independent, politico, reddit-r-politics',
            domains: 'politico.com, google.com',
            from: 'dateStringLessAMonth',
            to: 'dateString',
            language: 'en',
            sortBy: 'popularity',
            page: 1
        }).then(response => {
            currentUser = req.user;
            res.render('news-page', {
                articles: response.articles,
                currentUser
            });
        }).catch(console.error)
    });

    app.get('/blogs/view/:id', (req, res) => {
        let currentUser = req.user;
        Blog.findById(req.params.id).populate('comments').then((blog) => {
            res.render('blogs-show', {
                blog: blog,
                currentUser
            })

        }).catch((err) => {
            console.log(err.message);
        })
    });

    // Delete route in  views/blogs-show.handlebars POST method
    app.delete('/blogs/view/:id', function(req, res) {
        console.log("Delete Blog");
        Blog.findByIdAndRemove(req.params.id).then((blog) => {
            res.redirect('/');
        }).catch((err) => {
            console.log(err.message);
        })
    })


    app.get('/blogs/view/:id/edit', (req, res) => {
        let currentUser = req.user;
        Blog.findById(req.params.id, function(err, blog) {
            res.render('blogs-edit', {
                blog: blog,
                currentUser

            });
        })
    })

    // app.get('/blogs/new', (req, res) => {
    //     if (req.user) {
    //         var = new Blog
    //     }
    // })
    // Route for a new Blog(re,res,blogs this is working?)
    app.get('/blogs/new', (req, res) => {
        let currentUser = req.user;
        res.render('blogs-new', {
            currentUser
        });
    })
    // CREATE
    // app.post('/blogs/view', (req, res) => {
    //   if (req.user) {
    //     var blog = new Blog(req.body);
    //
    //     blog.save(function (err, post) {
    //       return res.redirect(`/blogs/view/${blog._id}`);
    //     })
    //   } else {
    //       console.log('here');
    //     return res.redirect('sign-up'); // UNAUTHORIZED
    //   }
    // });
    //CREATE
    app.post('/blogs/view', (req, res) => {
        Blog.create(req.body).then((blog) => {
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

    app.get('/', (req, res) => {
        let currentUser = req.user
        res.render('landingpage', {
            currentUser
        })
    })

    // app.get('/blogs', (req, res) => {
    //     let currentUser = req.user;
    //     res.render('blogs-index', {
    //         currentUser
    //     })
    // })

    /** Route for News articles
     * q: options Alternatively you can use the AND / OR / NOT keywords,
     * and optionally group these with parenthesis.
     *Eg: crypto AND (ethereum OR litecoin) NOT bitcoin.
     **/
    app.get('/articles/homepage', (req, res) => {
        newsapi.v2.everything({
            q: '+San Francisco, +California, +politics',
            sources: 'google-news, independent, politico, reddit-r-politics',
            domains: 'politico.com, google.com',
            from: 'dateStringLessAMonth',
            to: 'dateString',
            language: 'en',
            sortBy: 'relevancy',
            page: 1
        }).then(response => {
            console.log(req.user);
            // console.log(response);
            res.render('news-articles', {
                articles: response.articles,
                currentUser: req.user
            });
        }).catch(console.error)
    });


}
