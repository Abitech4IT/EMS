const mongoose = require('mongoose');

const regSchema = mongoose.Schema({
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    email: {type: String, required: true},
    regno: {type: String, required: true},
    address: {type: String, required: true},
    phone: {type: String, required: true},
    dob: {type: String, required: true},
    gender: {type: String, required: true},
    state: {type: String, required: true}
});
module.exports = mongoose.model('Reg', regSchema);