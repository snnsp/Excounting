const express = require('express')
const app = express()
const bodyParser =  require("body-parser")
const User = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const path=require("path")
const cookieParser = require("cookie-parser");


app.use(express.json())
app.use(bodyParser.urlencoded({ extended:true }))
app.use(express.static('public'))
app.use(cookieParser());

module.exports = {

    getLogin :(req,res)=>{ //Get login page
        if(req.cookies.access_token){ //If user already login
            return res.redirect('/dashboard')  //Redirect to dashboard
        }
        res.render("login", {error: null}); //If not send the login templete
    },

}
