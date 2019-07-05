require('dotenv').config()
const path = require('path')
const methodOverride = require('method-override')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const express = require('express')
const app = express()

//Setting up view engine
const exphbs = require('express-handlebars')
app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

// Setting up static assets serving
app.use(express.static(path.join(__dirname,'public')));

app.use(methodOverride('_method'));

// Setting up app configs
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

// Setting up db connection
mongoose.Promise = global.Promise
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true }, (err) => {
    if(err){
        console.log(err)
    } else {
        console.log('Connected to database...')
    }
})

// Importing routes
const routes = require('./src/routes/index')
app.use('/', routes)

// Determining port
const port = 3000 || process.env.PORT
app.listen(port, console.log(`Listening on port: ${port}`))