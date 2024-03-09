const mongoose = require('mongoose');

function connect(){
    mongoose.connect("mongodb+srv://pavan1010:pavan1010@maincluster.lmsrmmb.mongodb.net/").then(()=>{
        console.log("Database connected Successfully")
    }).catch((err)=>{
        console.log('error in Database connection \n'+err)
    })
}

module.exports = connect;