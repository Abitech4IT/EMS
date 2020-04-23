const express = require("express"); 
const Reg = require("../models/RegSchema");


const router = express.Router();

router.post("", (req, res, next) => {
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

router.put("/:id",(req, res, next) => {
    const updatedList = new Reg({
        _id: req.body.id,
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
    Reg.updateOne({_id: req.params.id}, updatedList).then(result =>{
        res.status(200).json({
            message: 'record Updated successfully!'
        });
    });
});

router.get("",(req, res, next) => {
    Reg.find().then(documents => {
        res.status(200).json({
            message: 'message fetched successfully!',
            Reglists: documents
        });
    });
    
});

router.get("/:id",(req, res, next) => {
    Reg.findById(req.params.id).then(data => {
        if(data){
            res.status(200).json(data);
        }else{
            res.status(404).json({message: 'Data not found'});
        }
    });
    
});

router.delete("/:id",(req, res, next) => {
    Reg.deleteOne({_id: req.params.id}).then(result =>{
        res.status(200).json({
            message: 'record deleted!'
        });
    });
});

module.exports = router;