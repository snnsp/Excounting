const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const User = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");
const cookieParser = require("cookie-parser");
const config = process.env;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

async function pushBalanceData(id, data) {
  const user = await User.findByIdAndUpdate(id, { $push:  data  });
  return user
}

function decoded(token){
  return jwt.verify(token, config.TOKEN_KEY);
}

module.exports = {
  postAddBalance: async (req, res) => {
    req.user = decoded(req.cookies.access_token);
    await pushBalanceData(req.user.user_id, {
      Balance: {
        Description: req.body.Description,
        Amount: req.body.Balance,
        Type: req.body.Type,
        createdDate: Date.now(),
      },
    });
    res.redirect("/dashboard");
  },
  pushBalanceData: pushBalanceData,
  decoded: decoded
}; 
