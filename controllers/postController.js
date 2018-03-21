// require model
const Post = require('../models/Post.js')

module.exports = {

    index: (req, res) =>{

        Post.find({}).populate("user").exec((err, allDemPosts)=> {

        res.json(allDemPosts)
        })

    },

    show: (req, res) =>{
        // var newDate = moment(foundEvent.startDate).utc().format('MMMM Do YYYY')
        //     res.render("eventEdit", {event: foundEvent, newDate:newDate});
        
        Post.findById(req.params.id, (err, thatPost) => {
            if(err) return res.json({ success: false })
        res.json(thatPost)
        })
    },
    
    new: (req, res) =>{
    },

    create: (req, res) =>{
        var newPost = new Post(req.body)
        newPost.user = req.user
        newPost.save((err, savedPost)=>{
        if(err) return res.json({ success: false })
        // res.json({ success: true, message: "post created.", post: savedPost })
        res.redirect("/")
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
        Post.findByIdAndRemove(req.params.postId, (err) =>{
        if(err) return res.json({ success: false })
        // res.json({ success: true, message: "post deleted." })
        console.log("im here")
        // res.render("/")
        })
    }
} 