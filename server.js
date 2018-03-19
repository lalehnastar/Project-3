const
    express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    postrRouter = require('./routes/router.js'),
    server = require('http').Server(app),
    io = require('socket.io')(server),
    cookieParser = require('cookie-parser'),
    axios = require('axios'),
    httpClient = axios.create(),
    methodOverride = require('method-override'),
    session = require('express-session'),
    MongoDBStore = require('connect-mongodb-session')(session),
    flash = require('connect-flash'),
    passport = require('passport'),
    passportConfig = require('./config/passport.js'),
    PORT = 3000
    // apiKey = process.env.API_KEY <--- if we use another API


// environment port
const
	port = process.env.PORT || 3000,
	mongoConnectionString = process.env.MONGODB_URL || 'mongodb://localhost/postrDB'

// will store session information as a 'sessions' collection in Mongo
const store = new MongoDBStore({
    uri: mongoConnectionString,
    collection: 'sessions'
  });

// middleware
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(logger('dev'))
app.use(express.static(`${__dirname}/public`))
app.use(cookieParser())
app.use(methodOverride('_method'))
app.use(flash())
app.use(session({							// allows us to generate cookies based on passport configuration
	secret: "secretstring",
	cookie: {maxAge: 60000000},				// cookie is good for this long. will log out once expired
	resave: true,
	saveUninitialized: false,				// if someones not logged in, dont generate cookie
	store: store							// where do we keep cookies? server (mongo). check line 27
}))			
app.use(passport.initialize())
app.use(passport.session())

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/public/index.html`)
})

// Use Router
app.use('/', postrRouter)

// Web Socket Setup
io.on('connection', (socket) => {
    console.log("New client connected")
    io.emit('post-message', post)
})

app.listen(PORT, (err) => {
    console.log(err || `Connected to port#: ${PORT}`)
})