
var mongoose = require('mongoose');
var QuoteSchema = new mongoose.Schema({
    name: {type: String, required: [true, "You must enter your name"], minlength: [6, "Your name must have at least 6 characters required"]},
    quote: {type: String, required: [true, "You must enter a quote"], minlength: [10, "The quote must have at least 10 characters required"]}
    }, 
    {timestamps: true});
mongoose.model('Quote', QuoteSchema);
