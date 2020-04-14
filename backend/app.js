const express = require("express");
const bodyParser = require("body-parser");

const app = express();

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

app.post("/api/Reglist", (req, res, next) => {
    const addedList = req.body;
    console.log(addedList);
    res.status(201).json({
        message: "List added successfully!"
    });

});

app.get("/api/Reglist",(req, res, next) => {
    const Reglists = [
        {
            id: 'fhewjh273', 
            firstname: 'Abideen', 
            lastname: 'Abdulazeez',
            email: 'abitechit@gmail.com',
            regno: 'xfghAD01',
            address: 'ilorin',
            phone: '09078126712',
            dob: '02/03/94',
            state: 'Oyo',
            gender: 'male'
        }
        // {
        //     id: 'fhewjh274', 
        //     firstname: 'Abubaka', 
        //     lastname: 'wahab',
        //     email: 'aabu@gmail.com',
        //     regno: 'xfghAD01',
        //     address: 'ilorin',
        //     phone: '09078126712',
        //     dob: '02/03/97',
        //     state: 'kwara',
        //     gender: 'male'
        // }
    ];
    res.status(200).json({
        message: 'message fetched successfully!',
        Reglists: Reglists
    });

});

module.exports = app;