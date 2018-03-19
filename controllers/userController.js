const User = require('../models/User.js')   // require model

module.exports = {

    index: (req, res) => {
        User.find({}, (err, allDemUsers)=> {
            res.json(allDemUsers)
        })
    },

    show: (req, res) => {
        User.findById(req.params.id, (err, thatUser) => {
            if(err) return res.json({ success: false })
                res.json(thatUser)
        })
    },

    new: (req, res) => {
        res.render('../views/partials/sign-up.ejs')
    },

    create: (req, res) =>{
        User.create(req.body, (err, brandNewUser) => {
            if(err) return res.json({ success: false })
            res.json({ success: true, message: "user created.", user: brandNewUser })
        })
    },

    edit: (req, res) =>{

    },

    update: (req, res) =>{
        User.findByIdAndUpdate(req.params.id, req.body, (err, updatedUser) => {
            res.json({ success: true, message: "user updated.", user: updatedUser})
        })
    },

    destroy: (req, res) =>{
        User.findByIdAndRemove(req.params.id, (err) =>{
            if(err) return res.json({ success: false })
            res.json({ success: true, message: "user deleted." })
        })
    }
}