const express = require("express"); 
const multer = require("multer");
const checkAuth = require("../middleware/check-auth");

const Reg = require("../models/RegSchema");


const router = express.Router();

const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg'
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const isValid = MIME_TYPE_MAP[file.mimetype];
      let error = new Error("Invalid mime type");
      if (isValid) {
        error = null;
      }
      cb(error, "backend/images");
    },
    filename: (req, file, cb) => {
      const name = file.originalname
        .toLowerCase()
        .split(" ")
        .join("-");
      const ext = MIME_TYPE_MAP[file.mimetype];
      cb(null, name + "-" + Date.now() + "." + ext);
    }
  });

router.post("", checkAuth, multer({storage: storage}).single("image"), (req, res, next) => {
    const url = req.protocol + '://' + req.get("host");
    const addedList = new Reg({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        regno: req.body.regno,
        address: req.body.address,
        phone: req.body.phone,
        dob: req.body.dob,
        gender: req.body.gender,
        state: req.body.state,
        imagePath: url + "/images/" + req.file.filename
    });
    addedList.save().then(createdList => {
        res.status(201).json({
            message: "List added successfully!",
            regs: {
                ...createdList,
                id: createdList._id
            }
        });

    });
   
});

router.put("/:id", checkAuth, multer({storage: storage}).single("image"), (req, res, next) => {
    let imagePath = req.body.imagePath;
    if(req.file){
        const url = req.protocol + '://' + req.get("host");
        imagePath = url + "/images/" + req.file.filename;

    }
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
        state: req.body.state,
        imagePath: imagePath
    });
    Reg.updateOne({_id: req.params.id}, updatedList).then(result =>{
        res.status(200).json({
            message: 'record Updated successfully!'
        });
    });
});

router.get("",(req, res, next) => {
    const pageSize = +req.query.pagesize;
    const currentPage = +req.query.page;
    const regQuery = Reg.find();
    let fetchedRegs;
    if(pageSize && currentPage){
        regQuery
        .skip(pageSize * (currentPage - 1))
        .limit(pageSize);
    }
    regQuery.then(documents => {
        fetchedRegs = documents;
        return Reg.count();
    })
    .then(count => {
        res.status(200).json({
            message: "List fetched Successfully!",
            reglists: fetchedRegs,
            maxReglists: count 
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

router.delete("/:id", checkAuth, (req, res, next) => {
    Reg.deleteOne({_id: req.params.id}).then(result =>{
        res.status(200).json({
            message: 'record deleted!'
        });
    });
});

module.exports = router;