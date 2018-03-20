const 
passport = require('passport'),
LocalStrategy = require('passport-local').Strategy,
User = require('../models/User.js')
//serialize makes it to a line instead of whole object
passport.serializeUser((user, done) => {
   done(null, user._id) 
})

passport.deserializeUser((id, done) => {
    User.findById(id, (err, thatUser)=> {
done(err, thatUser)
    })
})

passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
    //req after sign in with all its information 
}, (req, email, password, done) => {
    //passport control middleware if every infos is ok
    //check if the user with that email exists
    User.findOne({ email: email }, (err, user) => {
        //if problem show the err
        if(err) return done(err)
        //if no error and if user exists now check the uniqueness of email
        if(user) return done(null, false, req.flash('signupMessage', "email in used.")) 
        //James Majidian Question
   //how can I show the flash message  "All fields are required..." when type name and email but no password??
        if(!req.body.name || !req.body.password) return done(null, false, req.flash('signupMessage', "All fields are required..."))
        //after error and uniqueness check create the user and save it
        var newUser = new User()
        newUser.name = req.body.name
        newUser.email = req.body.email
        newUser.password = newUser.generateHash(req.body.password)
        newUser.save((err, savedUser) => {
            return done(null, newUser)
        })
       
    })
}))

passport.use('local-login', new LocalStrategy({

    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, (req, email, password, done) => {
    User.findOne({ email: email }, (err, user) => {
        if(err) return done(err)
        if(!user) return done(null, false, req.flash('loginMessage', "Invalid credential."))

        if(!user.validPassword(req.body.password)) return done(null, false, req.flash('loginMessage', "Invalid credential."))
        return done(null, user)

    })
}))

module.exports = passport
