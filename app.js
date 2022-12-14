require('dotenv').config()
require('./config/database').connect()

const express = require('express')
const app = express()
const bodyParser =  require("body-parser")
const cookieParser = require("cookie-parser");
const TokenVerity = require('./auth/TokenVerity')
const GroupExpenseVerify = require('./auth/GroupExpenseVerify')

const loginController = require('./controller/loginController')
const dashboardController = require('./controller/dashboardController')
const AccountController = require('./controller/AccountController')
const groupExpenseController = require('./controller/groupExpenseController')

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

app.get('/GroupExpense', TokenVerity, groupExpenseController.getGroupExpense)
app.post('/GroupExpense/create', TokenVerity, groupExpenseController.createNewGroupExpense)
app.get('/GroupExpense/:groupID', TokenVerity, GroupExpenseVerify.verifyGroupExpense, groupExpenseController.getGroupDetails)
app.post('/GroupExpense/addMember/:groupID', TokenVerity, GroupExpenseVerify.verifyGroupExpense, groupExpenseController.AddNewMember)
app.post('/GroupExpense/ActivateGroup/:groupID', TokenVerity, GroupExpenseVerify.verifyGroupExpense, groupExpenseController.ActivateGroup)
app.get('/GroupExpense/Approve/:groupID/:userID', TokenVerity, GroupExpenseVerify.verifyGroupExpense, groupExpenseController.ApproveExpense)

app.post('/AddBalance', TokenVerity, AccountController.postAddBalance)


module.exports = app

const http = require('http')
const server = http.createServer(app)

const {API_PORT} = process.env
const port = process.env.PORT

server.listen(port, ()=>{
    console.log(`Server running on PORT ${port}`)
})
