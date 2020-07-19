const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstname : {
        type : String,
        required : true
    },
    surname : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    registrationDate:{
        type : Date,
        required :true,
        default : Date.now
    }
})

module.exports = mongoose.model('User', userSchema)