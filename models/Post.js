// require mongoose
// create schema
const
    mongoose = require("mongoose"),
    commentSchema = new mongoose.Schema({
        body: String
    }),
    postSchema = new mongoose.Schema({
        body: {type: String, required: true},
        comments:[commentSchema],
        user: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    }, {timestamps: true}),
    
    Post = mongoose.model("Post", postSchema)

    module.exports = Post
// create model using mongoose
// export model