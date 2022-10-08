const mongoose = require('mongoose');
const {MONGO_URL} = process.env

exports.connect = () =>{
    mongoose.connect(MONGO_URL,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() =>{
        console.log('Connected to database')
    }).catch((error) =>{
        console.log(error)
        console.log('Connected fail')
        process.exit(1)
    })
}