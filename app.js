require("dotenv").config();
const express = require("express");
var session = require('express-session')
var bodyParser = require('body-parser')
const app = express();



const userRouter = require("./api/users/user.router");
 //console.log(session1);
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(express.json());
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    
  }))

app.use("/api/users", userRouter);


app.listen(process.env.APP_PORT, () => {
    console.log("Server up and running on port :", process.env.APP_PORT);
});