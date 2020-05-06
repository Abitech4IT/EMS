const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const regsRoute = require("./routes/regs");
const userRoute = require("./routes/user");

const app = express();

mongoose.connect("mongodb+srv://abitech:wMNsh9qSxrsAiRIA@cluster0-2rqx8.mongodb.net/erms-mean?retryWrites=true&w=majority")
.then(() =>{
    console.log('connection successfully!');
})
.catch(() =>{
    console.log('connection failed!');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use("/images", express.static(path.join("backend/images")));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", 
    "Origin, X-Resquested-With, Content-Type, Accept, Authorization");
    res.setHeader("Access-Control-Allow-Methods", 
    "GET, POST, PATCH, PUT, DELETE, OPTIONS");
    next();
});

app.use("/api/Reglist", regsRoute);
app.use("/api/user", userRoute);






module.exports = app;