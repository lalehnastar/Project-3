// require model
const Post = require('../models/Post.js')

module.exports = {

    index: (req, res) =>{
        Post.find({}, (err, allDemPosts)=> {
        res.json(allDemPosts)
        })

    },

    show: (req, res) =>{
        Post.findById(req.params.id, (err, thatPost) => {
            if(err) return res.json({ success: false })
        res.json(thatPost)
        })
    },
    
    new: (req, res) =>{
    },

    create: (req, res) =>{
        Post.create(req.body, (err, brandNewPost) => {
            if(err) return res.json({ success: false })
            res.json({ success: true, message: "post created.", post: brandNewPost })
        })
    },
    
    edit: (req, res) =>{
    },

    update: (req, res) =>{
        Post.findByIdAndUpdate(req.params.id, req.body, (err, updatedPost)=>{
            res.json({ success: true, message: "post updated.", post: updatedPost})
        })
    },

    destroy: (req, res) =>{
    Post.findByIdAndRemove(req.params.id, (err) =>{
        if(err) return res.json({ success: false })
        res.json({ success: true, message: "post deleted." })
        })
    }
} 