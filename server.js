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

mongoose.connect(mongoConnectionString, (err)=>{
    console.log(err || "Connected to MongoDB")
})

// will store session information as a 'sessions' collection in Mongo
const store = new MongoDBStore({
    uri: mongoConnectionString,
    collection: 'sessions'
  });

// Middleware
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(logger('dev'))
app.use(express.static(`${__dirname}/public`))
app.use(cookieParser())
app.use(methodOverride('_method'))
app.use(flash())
app.use(session({							// allows us to generate cookies based on passport configuration
	secret: "secretstring",
	cookie: {maxAge: 60000000},				// cookie is good for this amount of time. will log out once expired
	resave: true,
	saveUninitialized: false,				// if someones not logged in, dont generate cookie
	store: store							// where do we keep cookies? server (mongo). check line 27
}))	

app.use(passport.initialize())
app.use(passport.session())
app.use((req, res, next) => {               // this makes the 'currentUser' available in ANY view
    app.locals.currentUser = req.user       // also gives me a boolean 'loggedIn' available in ANY view
    app.locals.loggedIn = !!req.user
    next()
})


// ejs configuration
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render(`${__dirname}/public/index.ejs`)
})

// Use Router
app.use('/api', postrRouter)

function authorization(req, res, next) {
	if(req.isAuthenticated()) return next()
	res.redirect('/users/login')
}

// Web Socket Setup
io.on('connection', (socket) => {
    console.log("New client connected")
    io.emit('post-message', post)
})


// Server Setup
app.listen(PORT, (err) => {
    console.log(err || `Connected to port#: ${PORT}`)
})