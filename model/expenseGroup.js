const mongoose = require('mongoose')

const expenseGroupSchema = new mongoose.Schema({
    GroupName: {type: String},
    GroupLeader: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    AmountToPaid: {type: Number},
    GroupMember: [{
        Member: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        },
        AmountToPaid: {type: Number, default: NaN},
        PaidStatus: {type: Boolean, default: false}
        }
    ],
    GroupStatus: {type:String, default: "Idle"}
});

module.exports =  mongoose.model('expenseGroup', expenseGroupSchema);


