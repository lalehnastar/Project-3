const
    express = require('express'),                                   // require express
    router = new express.Router(),                                  // create new router using express
    passport = require('passport'),                                 // require passport
    userController = require('../controllers/userController.js')    // require user cntrlr
    postController = require('../controllers/postController.js')    // require post cntrlr


// ------------ USER ROUTES
router.get('/', userController.index)
router.get('/signup', userController.new)

// Create new user
router.route('/users')
    .post(passport.authenticate('local-signup', {
        successRedirect: "/nice",
        failureRedirect: "/boo"
    })) 

// Show, update and delete specific user
router.route('/users/:id')
    .get(userController.show)
    .patch(userController.update)
    .delete(userController.destroy)

// Edit specific user
router.get('/user/:id/edit', userController.edit)


// ------------ POST ROUTES
router.get('/', postController.index)

// Create new post
router.post('/posts', postController.create) 

// Create, show and delete specific post
router.route('/posts/:postId')   
    .get(postController.show)
    .delete(postController.destroy)

// Edit specific post
router.route('/user/:userId/posts/:postId')
    router.get(postController.edit)
    router.patch(postController.update)

// Create new post
router.get('/posts/:id/new', postController.new)
    
function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) return next()
    res.redirect('/users/login')
}

// export router
module.exports = router