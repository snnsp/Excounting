require('dotenv').config()
require('./config/database').connect()

const express = require('express')
const app = express()
const bodyParser =  require("body-parser")
const cookieParser = require("cookie-parser");
const TokenVerity = require('./auth/TokenVerity')

const loginController = require('./controller/loginController')
const dashboardController = require('./controller/dashboardController')
const AccountController = require('./controller/AccountController')

app.use(express.json())
app.use(bodyParser.urlencoded({ extended:true }))
app.use(express.static('public'))
app.use(cookieParser());
app.use("/public", express.static('public'))
app.use(express.static(__dirname + "/public"));

app.set("view engine", "ejs");

app.get('/login', loginController.getLogin)
app.post('/login', loginController.postLogin)
app.get('/register', loginController.getRegister)
app.post('/register', loginController.postRegister)
app.get('/logout', loginController.getLogout)

app.get('/dashboard', TokenVerity, dashboardController.getDashboard)

app.post('/AddBalance', TokenVerity, AccountController.postAddBalance)


module.exports = app