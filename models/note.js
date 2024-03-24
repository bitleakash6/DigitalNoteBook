const mongoose = require('mongoose');

//define the person schema
const candidateSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        unique: true,
    },
    notes:{
        type: String,
        required: true,
    }
});

//create Person model
const candidate = mongoose.model('Candidate', candidateSchema);
module.exports = candidate;