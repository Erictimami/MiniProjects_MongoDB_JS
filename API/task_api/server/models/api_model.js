
var mongoose = require('mongoose');
var task_apiSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    completed: {type: Boolean, required: true, default: false}
    }, 
    {timestamps: true});
    
mongoose.model('task_api', task_apiSchema);
