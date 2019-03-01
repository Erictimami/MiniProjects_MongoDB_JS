var mongoose = require('mongoose'); // we need this line. but I don't know why this line it's not import by the link below
require('../models/api_model.js');
var task_api = mongoose.model("task_api"); //  We need this line. but to let the controller know that the Quote is the "constructor" of the Mongodb.
module.exports = {
    index: function(request, response){
        task_api.find({}, function(err, result){
            if (err) {console.log('Return error : ', err);
                //respond with json
                response.json({message: 'Error', error: err});
            }
            else {
                //respond with json
                response.json({message: 'Success',  data: result});
            }
        });
    },
    
    find: function(request, response){
        task_api.find({_id: request.params.id}, function(err, result){
            if (err){
                // if there is an error upon saving, use console.log to see what is in the err object 
                console.log('We have an error! ', err);
                // adjust the code below as needed to create a flash message with the tag and content you would like
                response.json({message: 'Error', error: err});
            }
            else {
                //respond with json
                response.json({message: 'Success',  data: result});
            }
        });
    },
    create: function(request, response){ //this create is different of the create below. this is refering of require.create() of routes.js file. I could use any word instead of create base of the name of routes.js
        task_api.create(request.body, function(err, result){ // this create is the function query create of the mongoose
            if (err){
                // if there is an error upon saving, use console.log to see what is in the err object 
                console.log('We have an error! ', err);
                // adjust the code below as needed to create a flash message with the tag and content you would like
                response.json({message: 'Error', error: err});
            }
            else {
                response.redirect('/tasks');
            }
        });
    },
    update: function(request, response){
        task_api.findByIdAndUpdate(request.params.id, {$set: {title: request.body.title, description: request.body.description, completed: request.body.completed}}, function(err, result){
            if (err){
                // if there is an error upon saving, use console.log to see what is in the err object 
                console.log('We have an error! ', err);
                // adjust the code below as needed to create a flash message with the tag and content you would like
                response.json({message: 'Error', error: err});
            }
            else {
                response.redirect('/tasks');
            }
        });
    },
    remove: function(request, response){
        task_api.remove({_id: request.params.id}, function(err, result){
            if (err){
                // if there is an error upon saving, use console.log to see what is in the err object 
                console.log('We have an error! ', err);
                // adjust the code below as needed to create a flash message with the tag and content you would like
                response.json({message: 'Error', error: err});
            }
            else {
                response.redirect('/tasks');
            }
        });
    },

}