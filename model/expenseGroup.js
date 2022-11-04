const mongoose = require('mongoose')

const expenseGroupSchema = new mongoose.Schema({
    GroupName: {type: String},
    GroupLeader: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    GroupMember: [{
        Member: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        },
        AmountToPaid: {type: Number, default: NaN}
        }
    ],
});

module.exports =  mongoose.model('expenseGroup', expenseGroupSchema);


