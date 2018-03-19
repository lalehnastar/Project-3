// require mongoose
// create schema
const 
    mongoose = require("mongoose"),
    userSchema = new mongoose.Schema({
        email: {type: String, required: true, unique: true},
        username: {type: String, required: true, unique: true},
        password: {type: String, required: true},
        imageURL = {type: String}
    }),
    User = mongoose.model("User", userSchema)

    // PASSPORT STUFF

    module.exports = User


// create model using mongoose
// export model