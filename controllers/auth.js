//auth.js
const jwt = require('jsonwebtoken');
const User = require('../models/user')
module.exports = (app) => {
    //Route to login screen
    app.get('/login', (req, res) => {
        res.render('login')
    });
    //Get route to login screen
    app.get('/sign-up', (req, res) => {
        res.render('sign-up')
    });
    // SIGN UP POST routes
      app.post('/sign-up', (req, res) => {
        // Create User and JWT
        const user = new User(req.body);

        user.save().then((user) => {
          var token = jwt.sign({ _id: user._id }, process.env.SECRET, { expiresIn: "60 days" });

          res.cookie('nToken', token, { maxAge: 900000, httpOnly: true});
          console.log(res.cookie());
          res.redirect('/');
        }).catch((err) => {
          return res.status(400).send({ err: err });
        });
      });
}
