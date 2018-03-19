const
    express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    postrRouter = require('./routes/router.js'),
    server = require('http').Server(app),
    io = require('socket.io')(server),
    bcrypt = require(),
    cookieParser = require('cookie-parser'),
    axios = require('axios'),
    httpClient = axios.create(),
    methodOverride = require('method-override')
    MongoDBStore = require('connect-mongodb-session')(session),
    flash = require('connect-flash'),
    passportConfig = require('./config/passport.js'),
    PORT = 3000
    // apiKey = process.env.API_KEY <--- if we use another API


mongoose.connect('mongodb://localhost/postr', (err) => {
    console.log(err || 'Connected to mongoDB')
})
// middleware
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(logger('dev'))
app.use(express.static(`${__dirname}/public`))
app.use(cookieParser())
app.use(methodOverride('_method'))
app.use(flash())

// Is this unnecessary for a SPA?? 
/* app.get('/', (req, res) => {
    res.sendFile(``${__dirname}/public/index.html)
}) */

// Use Router
app.use('/', exampleRouter)

// Web Socket Setup
io.on('connection', (socket) => {
    console.log("New client connected")
    io.emit('post-message', post)
})

app.listen(PORT, (err) => {
    console.log(err || `Connected to port#: ${PORT}`)
})
