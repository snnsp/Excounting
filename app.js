require('dotenv').config()
require('./config/database').connect()

const express = require('express')
const app = express()
const bodyParser =  require("body-parser")
const cookieParser = require("cookie-parser");

const loginController = require('./controller/loginController')

app.use(express.json())
app.use(bodyParser.urlencoded({ extended:true }))
app.use(express.static('public'))
app.use(cookieParser());
app.use("/public", express.static('public'))
app.use(express.static(__dirname + "/public"));

app.set("view engine", "ejs");

app.get('/login', loginController.getLogin)



module.exports = app