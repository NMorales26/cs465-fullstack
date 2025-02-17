const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
    code: {type: String, required: true, unique: true},
    name: {type: String, required: true},
    length: {type: String},
    start: {type: Date, required: true},
    resort: {type: String, required: true},
    perPerson: {type: String},
    image: {type: String},
    description: {type: String}
});

mongoose.model('trips', tripSchema);