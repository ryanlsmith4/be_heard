
const methodOverride = require('method-override');
const express = require('express');
const app = express();
var cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
var exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const Blog = require('./models/blog');


//This I required after the app = express()
// But before all other routes because it parses the data

app.use(bodyParser.urlencoded({ extended: false}));
//app.use(bodyParser.json())
require('./controllers/comments-controller.js')(app);
require('dotenv').config();

app.use(cookieParser());

var checkAuth = (req, res, next) => {
    console.log("checking authentication");
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
const blogs = require('./controllers/routes')(app, Blog);



app.listen(3000, () => {
    console.log('App Listening on port 3000');
});
