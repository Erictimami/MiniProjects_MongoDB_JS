// Load the express module and store it in the variable express (Where do you think this comes from?)
var express = require("express");
console.log("Let's find out what express is", express);
// invoke express and store the result in the variable app
var app = express();
var path = require("path");



app.use(express.static(path.join(__dirname, "./static")));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');//means that the server has to find all the .ejs inside the view folder. 
// very important. we change all the html files to the ejs file.
// require body-parser to be able to use request form by writing request.body
var bodyParser = require('body-parser');
// use it!
app.use(bodyParser.urlencoded({extended: true}));


// needed to be able to use session
var session = require('express-session');

app.use(session({
    secret: 'keyboardkitteh',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }

}))

console.log("Let's find out what app is", app);
// use app's get method and pass it the base route '/' and a callback


// require the mongoose module
var mongoose = require('mongoose');
//open a connnexion to your db into the mongoDB and create it if not exist yet
mongoose.connect('mongodb://localhost/quotes_db');
// var nameValidator_n =[
//     validate({
//         validator: 'isLength',
//         ARGS: [6, 45],
//         message: 'Name must be between {ARGS[0]} and {ARGS[1]} characters'
//     }),
// ];
// var nameValidator_q =[
//     validate({
//         validator: 'isLength',
//         ARGS: [10, 250],
//         message: 'Quote must be between {ARGS[0]} and {ARGS[1]} characters'
//     }),  
// ];

// var QuoteSchema = new mongoose.Schema({
//     name: {type: String, required: true, validate: nameValidator_n},
//     quote: {type: String, required: true, validate: nameValidator_q},
//     }, 
//     {timestamps: true});

var QuoteSchema = new mongoose.Schema({
    name: {type: String, required: [true, "You must enter your name"], minlength: [6, "Your name must have at least 6 characters required"]},
    quote: {type: String, required: [true, "You must enter a quote"], minlength: [10, "The quote must have at least 10 characters required"]}
    }, 
    {timestamps: true});
var Quote = mongoose.model('Quote', QuoteSchema);

// set up other middleware, such as session
const flash = require('express-flash');
app.use(flash());
var validate = require('mongoose-validator');

app.get('/', function(request, response) {
    response.render("index");
})





app.post('/quotes', function (request, response){
    // console.log('request.body ',request.body);
    // var  quote = new Quote();
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
            Quote.find({}, function(err, result_quotes){
                if (err) {console.log(err);}
                response.render("quotes", {result: result_quotes});//specialy for this exercise, we're gonna render template on a post route
            });
            console.log('Finding quotes');
        }
    });
})
// tell the express app to listen on port 8000, always put this at the end of your server.js file
app.listen(8000, function() {
  console.log("listening on port 8000");
})

