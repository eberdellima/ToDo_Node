const path = require('path')
const methodOverride = require('method-override')
const bodyParser = require('body-parser')
const exphbs = require('express-handlebars')
const express = require('express')
const routes = require('../src/routes/index')
const app = express()


app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname,'public')));
app.use(methodOverride('_method'));

require('dotenv').config()
require('./database')()
app.use('/', routes)


module.exports = app