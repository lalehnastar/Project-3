const
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    User = require('../models/User.js')

passport.serializeUser((user, done) => {
   done(null, user._id) 
})

passport.deserializeUser((id, done) => {
    User.findById(id, (err, thatUser)=> {
done(err, thatUser)
    })
})

passport.use('local-signup', new LocalStrategy({            // the following executes when "sign-up" button is pressed                                        
    usernameField: 'username',                              // tell passport email and password field names in our DB
    passwordField: 'password',
    passReqToCallback: true
    //req after sign in with all its information 
}, (req, email, password, done) => {
    var email = req.body.email
    User.findOne({email: email}, (err, user) => {                      // makes sure email is unique, check to see if it already exists
        if(err) return done(err)
        if(user) return done(null, false, req.flash('creationMessage', "user already exists")) // return false value to prevent creation of new account with non-uniqueness

        if(!req.body.username || !req.body.password) return done(null, false, req.flash('signupMessage', "All fields required!"))
        var newUser = new User()
        // console.log(newUser.generateHash(req.body.password))
        console.log(req.body)
        newUser.username = req.body.username
        newUser.email = req.body.email
        newUser.imageURL = req.body.imageURL 
        newUser.password = newUser.generateHash(req.body.password)      // encrypt password
        newUser.save((err, savedUser) => {
            return done(null, newUser)
        })
       
    })
}))

passport.use('local-login', new LocalStrategy({
    usernameField: 'username',                                                                                             // map field to schema
    passwordField: 'password',
    passReqToCallback: true
}, (req, email, password, done) => {
    var username = req.body.username
    User.findOne({ username: username }, (err, user) =>{                                                                   // find user with email provided
        if(err) return done(err)                                                                                           // if error, return done w/ error (allows us to console.log)
        if(!user) return done(null, false, req.flash('loginMessage', "username not found"))                                // if 'user' if falsey, there is no user with that email
        if(!user.validPassword(req.body.password)) return done(null,false, req.flash('passwordMessage', "wrong password")) // if passowrd is wrong
        return done(null, user, req.flash('welcomeMessage', "welcome back!"))                                              // if they make it passed the above filters, they are who they say they are, return user
    })                               
}))

module.exports = passport
