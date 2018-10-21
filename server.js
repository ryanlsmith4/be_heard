//This file handles the execution flow for the server
//global variable for debugging

var debug = false;
module.export = debug;
var cookieParser = require('cookie-parser');
var exphbs = require('express-handlebars');

const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const express = require('express');
const app = express();
const Blog = require('./models/blog');

//Imports required for express()


require('dotenv').config();
// require('./controllers/comments-controller.js')(app)


//update with new MLAB URI
const dataBase = process.env.MONGODB_URI || ' mongodb://localhost/Be_heard';
////////////////////////////////////////////

// body
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(cookieParser());

var checkAuth = (req, res, next) => {

    if (typeof req.cookies.nToken === 'undefined' || req.cookies.nToken === null) {
        req.user = null;
    } else {
        var token = req.cookies.nToken;
        var decodedToken = jwt.decode(token, {
            complete: true
        }) || {};
        req.user = decodedToken.payload;
    }
    next()
}

app.use(checkAuth);

//override with POST having ?_method=DELETE or ?_method=put
app.use(methodOverride('_method'));

app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');
//

module.exports = app;
const mongoose = require('mongoose');
mongoose.connect(dataBase, {
    useNewUrlParser: true
});
// Required after app is declared and comments require body parser to run first
//Handle blog post and comments
const blogs = require('./controllers/routes')(app, Blog);
const Comment = require('./controllers/comments-controller')
require('./controllers/comments-controller.js')(app)



app.listen(process.env.PORT || 3000, () => {
    console.log('App Listening on port 3000');
});
