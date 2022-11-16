const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const User = require("../model/user");
const GroupExpense = require("../model/expenseGroup");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");
const cookieParser = require("cookie-parser");
const config = process.env;


app.use(express.json())
app.use(bodyParser.urlencoded({ extended:true }))
app.use(express.static('public'))
app.use(cookieParser());

async function AddNewMember(member, groupID){

        const group = await GroupExpense.findById(groupID)
        var isExist = false;
        for(i=0; i<group.GroupMember.length; i++){
            if(group.GroupMember[i].Member.equals(member._id)){
                isExist = true
                break;
            }
        }
        if(!isExist){
            const updateData = {Member: member._id}
            await GroupExpense.updateOne(
                { _id: groupID }, 
                { $push: { GroupMember: updateData } }
            );
        }
}

async function ActivateGroup(groupID, type, AmountToPaid){
    var group = await GroupExpense.findById(groupID)

    if(type == 'EqualShare'){
        const AmountToPaid = group.AmountToPaid / group.GroupMember.length
        for(i=0; i<group.GroupMember.length; i++){
            group.GroupMember[i].AmountToPaid = AmountToPaid
        }
    }
    else if(type == 'ManualShare'){
        for(i=0; i<group.GroupMember.length; i++){
            group.GroupMember[i].AmountToPaid = AmountToPaid[i]
        }
    }
    group.GroupStatus = 'OnGoing'
    await GroupExpense.findByIdAndUpdate(groupID, group)
}

module.exports = {
    getGroupExpense :async (req,res)=>{
        const token = req.cookies.access_token;
        const decoded = jwt.verify(token, config.TOKEN_KEY);
        req.user = decoded;

        const group = await GroupExpense.find({$or:[
            {GroupLeader: req.user.user_id},
            {"GroupMember.Member": req.user.user_id}
        ]}).populate('GroupLeader', 'firstname lastname').populate('GroupMember.Member', 'firstname lastname')

        res.render('groupExpense',{
            group: group,
            user: req.user
        })
    },

    createNewGroupExpense :async(req,res)=>{
        const token = req.cookies.access_token;
        const decoded = jwt.verify(token, config.TOKEN_KEY);
        req.user = decoded;

        const group = await GroupExpense.create({
            GroupName: req.body.GroupName,
            GroupLeader: req.user.user_id,
            AmountToPaid: req.body.TotalCost,
            "GroupMember.0.Member": req.user.user_id
        })
        res.redirect('/GroupExpense')
    },

    getGroupDetails :async(req,res)=>{
        const token = req.cookies.access_token;
        const decoded = jwt.verify(token, config.TOKEN_KEY);
        req.user = decoded;

        const group = await GroupExpense.findById(req.params.groupID)
        .populate('GroupLeader', 'firstname lastname').populate('GroupMember.Member', 'firstname lastname')

        var manageGroupPermission = false;

        if(group.GroupLeader.equals(req.user.user_id)){
            manageGroupPermission = true;
        }

        res.render('GroupExpenseDetails',{
            group:group,
            manageGroupPermission: manageGroupPermission,
            groupStatus: group.GroupStatus
        })
    },
    AddNewMember :async(req,res)=>{
        const token = req.cookies.access_token;
        const decoded = jwt.verify(token, config.TOKEN_KEY);
        req.user = decoded;
        var member = null
        try{
        member = await User.findById(req.body.MemberID, '_id')
        }catch{
            console.log("Error ID NotFound")
        }

        if(member != null){
            AddNewMember(member, req.params.groupID)
        }

        res.redirect('/GroupExpense/' + req.params.groupID)
    },

    ActivateGroup :async (req,res)=>{
        const token = req.cookies.access_token;
        const decoded = jwt.verify(token, config.TOKEN_KEY);
        req.user = decoded;

        ActivateGroup(req.params.groupID, req.body.type, req.body.AmountToPaid)
        res.redirect('/GroupExpense/' + req.params.groupID)
    },
    ApproveExpense :async (req,res)=>{
        const token = req.cookies.access_token;
        const decoded = jwt.verify(token, config.TOKEN_KEY);
        req.user = decoded;

        var group = await GroupExpense.findById(req.params.groupID)
        var complete_count = 0

        for(i=0; i<group.GroupMember.length; i++){
            if(group.GroupMember[i].PaidStatus == true){
                complete_count += 1
            }
            if(group.GroupMember[i].Member._id == req.params.userID && group.GroupMember[i].PaidStatus == false){
                group.GroupMember[i].PaidStatus = true
                await User.findByIdAndUpdate(req.params.userID,{ $push:{
                    Balance:{
                        Description: group.GroupName,
                        Amount: group.GroupMember[i].AmountToPaid,
                        Type: "Expense",
                        createdDate: Date.now(),
                      }
                }})
                await GroupExpense.findByIdAndUpdate(req.params.groupID, group)
                complete_count += 1
            }
        }
        
        if(complete_count == group.GroupMember.length){
            await GroupExpense.findByIdAndUpdate(req.params.groupID,{
                GroupStatus: "Complete"
            })
        }
        
        res.redirect('/GroupExpense/' + req.params.groupID)
    },    
}
