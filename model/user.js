const mongoose = require('mongoose')

const AccountSchema = new mongoose.Schema({
    Income:[{
        Income: { type: Number },
        createdDate: {type: Date}
    }],
    Expense:[{
        Expense: { type: Number },
        createdDate: {type: Date}
    }]
})

const UserSchema = new mongoose.Schema({
    firstname: {type: String, default: null},
    lastname: {type: String, default: null},
    telephone: {type: String, default: null},
    email: {type: String, unique: true},
    password: {type: String},
    Account: {type: AccountSchema}
    
})

module.exports = { user: mongoose.model('user', UserSchema), Account: mongoose.model('Account', AccountSchema) };


