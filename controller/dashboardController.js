const express = require('express')
const app = express()
const bodyParser =  require("body-parser")
const cookieParser = require("cookie-parser");


app.use(express.json())
app.use(bodyParser.urlencoded({ extended:true }))
app.use(express.static('public'))
app.use(cookieParser());

module.exports = {

    getDashboard :(req,res)=>{ 
        res.send("Welcome to dashboard")
    }
}
