const 
    // require mongoose
    mongoose = require("mongoose"),
    // create schema
    userSchema = new mongoose.Schema({
        email: {type: String, required: true, unique: true},
        username: {type: String, required: true, unique: true},
        password: {type: String, required: true},
        imageURL: {type: String}
    }),
    // create model using mongoose
    User = mongoose.model("User", userSchema)

    // Authentication
    userSchema.methods.generateHash = function(password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync())          // generates hash from provided password
      }
      
      userSchema.methods.validPassword = function(password) {
        return bcrypt.compareSync(password, this.password)       
      }

    
    // export model
    module.exports = User



