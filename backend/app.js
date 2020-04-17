const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const Reg = require("./models/RegSchema");

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

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", 
    "Origin, X-Resquested-With, Content-Type, Accept, Authorization");
    res.setHeader("Access-Control-Allow-Methods", 
    "GET, POST, PATCH, PUT, DELETE, OPTIONS");
    next();
});

//

app.post("/api/Reglist", (req, res, next) => {
    const addedList = new Reg({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        regno: req.body.regno,
        address: req.body.address,
        phone: req.body.phone,
        dob: req.body.dob,
        gender: req.body.gender,
        state: req.body.state
    });
    addedList.save().then(createdList => {
        res.status(201).json({
            message: "List added successfully!",
            regId: createdList._id
        });

    });
   
});

app.get("/api/Reglist",(req, res, next) => {
    Reg.find().then(documents => {
        res.status(200).json({
            message: 'message fetched successfully!',
            Reglists: documents
        });
    });
    
});

app.delete("/api/Reglist/:id",(req, res, next) => {
    Reg.deleteOne({_id: req.params.id}).then(result =>{
        console.log(result);
        res.status(200).json({
            message: 'record deleted!'
        });
    });
});

module.exports = app;