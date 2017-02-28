require('dotenv').config()
const express = require('express')
const favicon = require('serve-favicon')
const bodyParser = require('body-parser')
const session = require('express-session')
const hbs = require('express-handlebars')
const morgan = require('morgan')
const path = require('path')
const app = express()
const methodOverride = require('method-override')

// CONFIG
require('./db/config')
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, 'public')))
app.use(favicon(path.join(__dirname, 'public/favicon.ico')))
app.use(bodyParser.urlencoded({extended: true}))
app.use(methodOverride('_method'))
app.use(session({secret: 'keyboard cat', resave: false, saveUninitialized: true}))
app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'main', layoutsDir: path.join(__dirname, 'views/layouts/')}))
app.set('view engine', 'hbs')

// ROUTES
app.use('/', require('./routes/index'))
app.use('/action', require('./routes/action'));
app.use('/api', require('./routes/api'));
app.use('/auth', require('./routes/auth'));
app.use('/example', require('./routes/example'))
app.use('/profile', require('./routes/profile'));
app.use('/user', require('./routes/user'));
app.use(require('./routes/error'))

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Listening on ${port}`)
})
