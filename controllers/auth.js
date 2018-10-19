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

        User.findOne({username : req.body.username}).then((user) => {
            if(user){
                console.log(user);
                res.send("Username already exists");
            }else{
                // Create User and JWT
                const user = new User();
                user.username = req.body.username;
                user.email = req.body.email;
                user.password = user.generateHash(req.body.password);
                console.log(user);
                user.save().then((user) => {
                  var token = jwt.sign({ _id: user._id }, process.env.SECRET, { expiresIn: "60 days" });

                  res.cookie('nToken', token, { maxAge: 900000, httpOnly: true});
                  console.log(res.cookie());
                  res.redirect('/');
                }).catch((err) => {
                  return res.status(400).send({ err: err });
                });
            }
        })
      });
      //LOGOUT
      app.get('/logout', (req, res) => {
          res.clearCookie('nToken');
          res.redirect('/');
      });

      //Login logic
      app.post('/login', (req, res) => {
          //Find this user name
         User.findOne({username: req.body.username }, 'username password ').then((user) => {
             console.log(user);
              if(!user) {
                  //user not found
                  return res.status(401).send({ message: 'User does not exist' });
              }
          // check PASSWORD
              if(!user.validPassword(req.body.password)) {
                  //Pass does not match
                  return res.status(401).send({ message: "Incorrect Password"});
              }
              //Create Token
              console.log("HERE");
              const token = jwt.sign(
                  { _id: user._id, username: user.username }, process.env.SECRET,
                  { expiresIn: "60 days"}
              );
              // Set a cookie and redirect to root
              res.cookie('nToken', token, { maxAge: 900000, httpOnly: true });
              res.redirect('/articles/homepage');
          }).catch((err) => {
              console.log("THERES AN ERR")
              console.log(err);
          })
      })
}
