const mongoose = require('mongoose');

function connect(){
    mongoose.connect(process.env.URL).then(()=>{
        console.log("Database connected Successfully")
    }).catch((err)=>{
        console.log('error in Database connection \n'+err)
    })
}

module.exports = connect;