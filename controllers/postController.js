// require model
const Post = require('../models/Post.js')

module.exports = {
    //index
index: (req, res) =>{
    Post.find({}, (err, allDemPosts)=> {
       res.json(allDemPosts)
    })

},
//show
show: (req, res) =>{
    Post.findById(req.params.id, (err, thatPost) => {
        if(err) return res.json({ success: false })
       res.json(thatPost)
    })
   
},

//new 
new: (req, res) =>{
 
},


//create
create: (req, res) =>{
   
    Post.create(req.body, (err, brandNewPost) => {
     
        if(err) return res.json({ success: false })
        res.json({ success: true, message: "post created.", post: brandNewPost })
    })


  
},

//edit 
edit: (req, res) =>{
  
},
//update
update: (req, res) =>{
    Post.findByIdAndUpdate(req.params.id, req.body, (err, updatedPost)=>{
        res.json({ success: true, message: "post updated.", post: updatedPost})
    })
},

//destroy
destroy: (req, res) =>{
  Post.findByIdAndRemove(req.params.id, (err) =>{
    if(err) return res.json({ success: false })
    res.json({ success: true, message: "post deleted." })
  } )

}
} 