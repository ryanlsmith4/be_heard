//this file is handling user authentication using a JSON web
//token for user uniquness

// Global Debug default for console output
var debug = require('../server').debug

const jwt = require('jsonwebtoken');
const User = require('../models/user')

module.exports = (app) => {
    //Route to login screen
    app.get('/login', (req, res) => {
        res.render('login')
    }); // END get route login

    //Get route to login screen
    app.get('/sign-up', (req, res) => {
        res.render('sign-up')
    }); // END get sign up

    // SIGN UP POST routes
    app.post('/sign-up', (req, res) => {
        // Create new user if userna me is not already takwn
        User.findOne({
            username: req.body.username
        }).then((user) => {

            if (debug) {
                console.log(user);
            }

            if (user) {
                res.send("Username already exists");
            } else {
                // Name is unique create new user
                const user = new User();
                user.username = req.body.username;
                user.email = req.body.email;
                user.password = user.generateHash(req.body.password);

                if (debug) {
                    console.log(user);
                }
                // Save a User to the dataBase
                user.save().then((user) => {
                    // Assign unique JSON token to new user
                    var token = jwt.sign({
                        _id: user._id
                    }, process.env.SECRET, {
                        expiresIn: "60 days"
                    });

                    res.cookie('nToken', token, {
                        maxAge: 900000,
                        httpOnly: true
                    });

                    if (debug) {
                        console.log(res.cookie());
                    }
                    // If user saves correctly return to home screen
                    res.redirect('/');

                }).catch((err) => {

                    return res.status(400).send({
                        err: err
                    });
                });// END of catch

            } // End of else block

        })// END of then

    }); // END SIGN UP POST routes

    // Handle User Logout and clear user cookie
    app.get('/logout', (req, res) => {
        res.clearCookie('nToken');
        res.redirect('/');
    });// END Logout

    // POST route for login check to see if user exists
    // if user does exist check for valid password
    // if valid assign JSON token
    app.post('/login', (req, res) => {
        //Find this user name
        User.findOne({
            username: req.body.username
        }, 'username password ').then((user) => {

            if (debug) {
                console.log(user);
            }

            if (!user) {
                //user not found
                return res.status(401).send({
                    message: 'User does not exist'
                });
            }
            // check PASSWORD
            if (!user.validPassword(req.body.password)) {
                //Pass does not match
                return res.status(401).send({
                    message: "Incorrect Password"
                });
            }

            if (debug) {
                console.log("HERE");
            }

            //Create Token
            const token = jwt.sign({
                _id: user._id,
                username: user.username
            }, process.env.SECRET, {
                expiresIn: "60 days"
            }); // END cookie creation

            // Set a cookie and redirect to root
            res.cookie('nToken', token, {
                maxAge: 900000,
                httpOnly: true
            });
            res.redirect('/articles/homepage');
        }).catch((err) => {

            if (debug) {
                console.log("THERES AN ERR");
            }

            console.log(err);
        }) // END catch
    })// END POST route for creating users

} // END Export
