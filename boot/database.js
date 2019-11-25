const mongoose = require('mongoose')
const { logError } = require('zippy-logger')

module.exports = () => {
 
  mongoose.Promise = global.Promise
  mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err) {
      logError({ message: err, path: "mongoose setup" })
    } else {
      console.log('Connected to database...')
    }
  })
  
}