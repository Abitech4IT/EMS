const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, "this_very_secret_must_be_larger");
        next();
    } catch(error){
        res.status(401).json({message: 'Auth failed'});
    }

};