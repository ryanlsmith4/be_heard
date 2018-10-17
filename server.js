require('dotenv').config();
const methodOverride = require('method-override');
var cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const express = require('express');
const app = express();
var exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const Blog = require('./models/blog');





//This I required after the app = express()
// But before all other routes because it parses the data
app.use(bodyParser.urlencoded({ extended: true}));


//override with POST having ?_method=DELETE or ?_method=put
app.use(methodOverride('_method'));

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
//

module.exports = app;
const blogs = require('./controllers/routes')(app, Blog);
app.use(cookieParser());
app.listen(3000, () => {
    console.log('App Listening on port 3000');
});
