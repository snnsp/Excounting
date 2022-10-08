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

module.exports = mongoose.model('Account', AccountSchema)

