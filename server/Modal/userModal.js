const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: { 
        type: String 
    },

    email: { 
        type: String, 
        unique: true, 
        require: true 
    },

    image:{
        type:String,
    },

    password: {
        type: String,
        require:true
     }
})

const user  = mongoose.model('user',UserSchema);
module.exports = user;