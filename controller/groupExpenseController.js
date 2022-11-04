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

module.exports = {
    getGroupExpense :async (req,res)=>{
        const token = req.cookies.access_token;
        const decoded = jwt.verify(token, config.TOKEN_KEY);
        req.user = decoded;

        const group = await GroupExpense.find({$or:[
            {GroupLeader: req.user.user_id},
            {"GroupMember.Member": req.user.user_id}
        ]}).populate('GroupLeader', 'firstname lastname')
        console.log(group) 

        res.render('groupExpense',{
            group: group
        })
    },

    createNewGroupExpense :async(req,res)=>{
        const token = req.cookies.access_token;
        const decoded = jwt.verify(token, config.TOKEN_KEY);
        req.user = decoded;

        const group = await GroupExpense.create({
            GroupName: req.body.GroupName,
            GroupLeader: req.user.user_id,
            AmountToPaid: req.body.TotalCost
        })
        res.redirect('/GroupExpense')
    }
}
