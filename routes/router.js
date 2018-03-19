// require express
// create new router using express
// require controller


//
function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) return next()
    res.redirect('/users/login')
  }

// export router