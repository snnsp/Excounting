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

    postLogin : async (req,res)=>{ //Post login
        try{
            const username = req.body.username //Get request email
            const password =req.body.psw //Get request password
            const user = await User.findOne({ username }); 
            if (user && (await bcrypt.compare(password, user.password))) { // IF found user check the password
                // Create token
                const token = jwt.sign(
                  { user_id: user._id, 
                    username,
                },
                  process.env.TOKEN_KEY,
                  {
                    expiresIn: "3h",
                  }
                );

                user.token = token;
                res.cookie("access_token", user.token, { expires: new Date(Date.now() + 9000000), httpOnly: true, secure: true }) //Create cookies
                console.log("Created Cookies")
                return res.status(200).redirect('/dashboard') 
              }
              return res.render("login", {error: "Invalid Username or password please try again"});
    
        }
        catch(error){
            console.log(error)
        }
    },

    getRegister: (req,res)=>{ //Get register page
        if(req.cookies.access_token){ //If user already login
            return res.redirect('/dashboard') //Redirect to dashboard
        }
        res.sendFile(path.join(__dirname + '/../views/register.html')); //Send register page to user
    },

    postRegister: async (req,res)=>{ //Post Register
        try{
            console.log(req.body)
            if(req.body.psw != req.body.psw_repeat){
                res.status(400).send("Password is not the same")
            }
            //Set up data from request
            const firstname = req.body.firstname 
            const lastname = req.body.lastname
            const username = req.body.username
            const password = req.body.psw
    
            const validate_username = await User.findOne({username}) //Check that username already exist or not
            if(validate_username){ //If username exist
                res.status(409).send("User already exist")
            }
            encrypted_password = await bcrypt.hash(password, 10) //Encrypt the password of user
    
            const user = await User.create({ //Create the user
                firstname: firstname,
                lastname: lastname,
                username: username,
                password: encrypted_password,
                Account: []
            })
            const token = jwt.sign(
                { user_id: user._id, username },
                process.env.TOKEN_KEY,
                {
                  expiresIn: "3h",
                }
              );
            user.token = token;
            return res.redirect('/login')
        }
        catch(err){
            console.log(err)
        }    
    },
    getLogout: (req,res)=>{ //Get logout 
        cookie = req.cookies; //Get the cookie
        for (var prop in cookie) {
            if (!cookie.hasOwnProperty(prop)) {
                continue;
            }    
            res.cookie(prop, '', {expires: new Date(0)}); //Destroy cookie
        }
        res.redirect('/login'); //Redirect back to login page
    }
}
