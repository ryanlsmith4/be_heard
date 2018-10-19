require('dotenv').config();
const methodOverride = require('method-override');
const express = require('express');
const app = express();
var cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
var exphbs = require('express-handlebars');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI ||' mongodb://localhost/contractor_proj', {
    useNewUrlParser: true
});
//This I required after the app = express()
// But before all other routes because it parses the data
app.use(bodyParser.urlencoded({ extended: false}));

app.use(cookieParser());

var checkAuth = (req, res, next) => {

    if(typeof req.cookies.nToken === 'undefined' || req.cookies.nToken === null) {
        req.user = null;
    } else {
        var token = req.cookies.nToken;
        var decodedToken = jwt.decode(token, { complete: true}) || {};
        req.user = decodedToken.payload;
    }
    next()
}
app.use(checkAuth);

//override with POST having ?_method=DELETE or ?_method=put
app.use(methodOverride('_method'));

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
//

module.exports = app;

const Blog = require('./models/blog');
const Comment = require('./controllers/comments-controller')
require('./controllers/comments-controller.js')(app)
const blogs = require('./controllers/routes')(app, Blog);



app.listen(3000, () => {
    console.log('App Listening on port 3000');
});
