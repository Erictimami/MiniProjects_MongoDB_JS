var mongoose = require('mongoose'); // we need this line. but I don't know why this line it's not import by the link below
require('../models/quote.js');
var Quote = mongoose.model("Quote"); //  We need this line. but to let the controller know that the Quote is the "constructor" of the Mongodb.
module.exports = {
    index: function(request, response){
        response.render('index');
    },
    create: function(request, response){
        Quote.create(request.body, function(err, result){
            if (err){
                // if there is an error upon saving, use console.log to see what is in the err object 
                console.log('We have an error! ', err);
                // adjust the code below as needed to create a flash message with the tag and content you would like
                for(var key in err.errors){
                    console.log("error", err.errors[key].message);
                    request.flash('registration', err.errors[key]);
                }
                // redirect the user to an appropriate route
                response.redirect('/');
            }
            else {
                response.redirect('/quotes')
            }
        });
    },
    find: function(request, response){
        Quote.find({}, function(err, result_quotes){
            if (err) {console.log(err);}
            response.render("quotes", {result: result_quotes});
        });
    }
}