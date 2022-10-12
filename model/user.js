const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    firstname: {type: String, default: null},
    lastname: {type: String, default: null},
    username: {type: String,},
    password: {type: String},
    Balance:[{
        Description: {type: String},
        Amount: { type: Number },
        Type: {type: String},
        createdDate: {type: Date}
    }]
});

module.exports =  mongoose.model('user', UserSchema);


