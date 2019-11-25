const app = require('./boot/app')
const port = 3000 || process.env.PORT
const { logError } = require('zippy-logger')


const startServer = () => {
    try {
        app.listen(port, console.log(`Listening on port: ${port}`))
    } catch(err) {
        logError({message: err, path: "app listens to port"})
    }
}

startServer()