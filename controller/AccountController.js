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

module.exports = {
  postAddBalance: async (req, res) => {
    const token = req.cookies.access_token;
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    req.user = decoded;

    const user = await User.findByIdAndUpdate(req.user.user_id,{ $push:{
        Balance:{
            Description: req.body.Description,
            Amount: req.body.Balance,
            Type: req.body.Type,
            createdDate: Date.now(),
          }
    }
    });


    res.redirect('/dashboard')
  },
};
