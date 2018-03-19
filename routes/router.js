// require express
// create new router using express
// require controller
const
    express = require('express'),
    router = new express.Router(),
    passport = require('passport'),
    userController = require('../controllers/userController.js')
    postController = require('../controllers/postController.js')

    router.get('/', userController.index)
    router.get('/signup', userController.new)    
    router.post('/users', userController.create)    
    // router.get('/user/new', userController.new)
    router.get('/user/:id/edit', userController.edit)
    router.get('/user/:id', userController.show)
    router.patch('/user/:id/', userController.update)
    router.delete('/user/:id', userController.destroy)

    router.get('/', postController.index)
    router.post('/post/:id', postController.create) 
    router.get('/post/:id/new', postController.new)
    router.get('/user/:id/post/:id', postController.edit)
    router.get('/post/:id', postController.show)
    router.patch('/user/:id/post/:id', postController.update)
    router.delete('/post/:id', postController.destroy)


// export router
module.exports = routers




