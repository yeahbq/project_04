require('dotenv').config()
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var session = require('express-session')
var morgan = require('morgan')
var methodOverride = require('method-override'); //used to manipulate POST
var app = express();
var hbs = require('express-handlebars')
var mongoose = require('./api/config/database');
var routes = require('./api/config/routes');

app.use(morgan('dev'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'main', layoutsDir: path.join(__dirname, 'views/layouts/')}))
app.use(session({secret: 'keyboard cat', resave: false, saveUninitialized: true}))
app.set('view engine', 'hbs')

app.use(express.static(path.join(__dirname, 'public')));

//ROUTES
app.use('/', routes);
app.use('/action', require('./api/controllers/action'));
app.use('/auth', require('./api/controllers/auth'));
app.use('/profile', require('./api/controllers/profile'));

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Listening on ${port}`)
})
