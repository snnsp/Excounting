const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const User = require("../model/user");
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

    getDashboard :async (req,res)=>{ 
        const token = req.cookies.access_token;
        const decoded = jwt.verify(token, config.TOKEN_KEY);
        req.user = decoded;

        const user = await User.findById(req.user.user_id)

        var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        const MonthlyReportDate = months[new Date().getMonth()] + " " + new Date().getFullYear()
        
        const UserAccount = user.Balance
        var Balance = []
        var TotalIncome = 0
        var TotalExpense = 0

        for(var i=0; i<UserAccount.length; i++){
            dataDate = UserAccount[i].createdDate.getFullYear() + "-" + UserAccount[i].createdDate.getMonth()
            TargetDate = new Date().getFullYear() + "-" + new Date().getMonth()

            if(dataDate == TargetDate){
                Balance.push(UserAccount[i])
                if(UserAccount[i].Type == 'Income'){
                    TotalIncome += UserAccount[i].Amount
                }
                else{
                    TotalExpense += UserAccount[i].Amount
                }
            }
        }

        var TotalLeft = TotalIncome - TotalExpense

        res.render("dashboard",{
            user: user,
            MonthlyReportDate: MonthlyReportDate,
            Balance: Balance,
            TotalIncome: TotalIncome,
            TotalExpense: TotalExpense,
            TotalLeft: TotalLeft
        })
    }
}
