var mongoose = require('mongoose'); // we need this line. but I don't know why this line it's not import by the link below
require('../models/api_model.js');
var api_1955 = mongoose.model("api_1955"); //  We need this line. but to let the controller know that the Quote is the "constructor" of the Mongodb.
module.exports = {
    index: function(request, response){
        api_1955.find({}, function(err, result){
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
    create: function(request, response){ //this create is different of the create below. this is refering of require.create() of routes.js file. I could use any word instead of create base of the name of routes.js
        api_1955.create(request.params, function(err, result){ // this create is the function query create of the mongoose
            if (err){
                // if there is an error upon saving, use console.log to see what is in the err object 
                console.log('We have an error! ', err);
                // adjust the code below as needed to create a flash message with the tag and content you would like
                response.json({message: 'Error', error: err});
            }
            else {
                response.redirect('/');
            }
        });
    },
    remove: function(request, response){
        api_1955.remove({name: request.params.name}, function(err, result){
            if (err){
                // if there is an error upon saving, use console.log to see what is in the err object 
                console.log('We have an error! ', err);
                // adjust the code below as needed to create a flash message with the tag and content you would like
                response.json({message: 'Error', error: err});
            }
            else {
                response.redirect('/');
            }
        });
    },
    find: function(request, response){
        api_1955.find({name: request.params.name}, function(err, result){
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
        })
    }
}