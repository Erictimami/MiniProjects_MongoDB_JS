
var mongoose = require('mongoose');
var api_1955Schema = new mongoose.Schema({
    name: {type: String, required: true}
    }, 
    {timestamps: true});
mongoose.model('api_1955', api_1955Schema);
