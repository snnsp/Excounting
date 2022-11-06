const jwt = require("jsonwebtoken");
const config = process.env;
const GroupExpense = require("../model/expenseGroup");

module.exports = { 
    verifyGroupExpense: async (req, res, next) => {
    const token = req.cookies.access_token;
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    req.user = decoded;

    const group = await GroupExpense.findById(req.params.groupID)
    var validate = false
    for(i=0; i<group.GroupMember.length; i++){
        if(group.GroupMember[i].Member == req.user.user_id){
            validate = true
            break
        }
    }
    if(validate == false){
        return res.status(403).send("No permisson on this group")
    }
  return next();
}
}
