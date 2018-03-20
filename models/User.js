const 
    // require mongoose
    mongoose = require("mongoose"),
    // require bcrypt
    bcrypt = require("bcrypt-nodejs")
    // create schema
    userSchema = new mongoose.Schema({
        email: {type: String, required: true},
        username: {type: String},
        imageURL: {type: String, default: ""},
        password: {type: String}
        
    })

    // Authentication
    userSchema.methods.generateHash = function(password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync())          // generates hash from provided password
      }
      
    userSchema.methods.validPassword = function(password) {
        return bcrypt.compareSync(password, this.password)       
      }

// create model using mongoose
const User = mongoose.model("User", userSchema)
    
// export model
module.exports = User



