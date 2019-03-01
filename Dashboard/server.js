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
mongoose.connect('mongodb://localhost/dashboard_db');

var AnimalSchema = new mongoose.Schema({
    name: {type: String, required: [true, 'You must enter the name'], minlength: [2, 'the name must have at least 2 characters required']},
    type: {type: String, required: [true, "You must enter a type"], minlength: [3, "The kind must have at least 3 characters required"]},
    age: {type: Number, required: [true, "You must enter the age"], minlength: [1, "The age must be a number less than 40"]},
    status: {type: String, required: [true, "You must enter a status"], minlength: [4, "The status must have at least 4 characters required"]}},
    {timestamps: true} );

var Animal = mongoose.model('Animal', AnimalSchema);


// set up other middleware, such as session
const flash = require('express-flash');
app.use(flash());
var validate = require('mongoose-validator');

app.get('/', function(request, response) {
    Animal.find({}, function(err, result_animal){ // this is the query for finding all animal in the db with a callback fucntion with 2 arguments for the 2 possibilities: a error or a result
        if (err){
            console.log('Error when We were finding all the animals into db : ', err);
            response.render('index');
        } else {
            response.render('index', {result: result_animal});
        }
    })
})

app.get('/mongooses/new', function(request, response){
    response.render('new');
})
app.post('/mongooses/:id', function(request, response){
    Animal.update({_id: request.params.id}, {$set: {name: request.body.name, type: request.body.type, age: request.body.age, status: request.body.status}}, {runValidators: true}, function(err, result){
        if (err){
            console.log('Finding Error when we are trying to update a field into db', err);
            for(var key in err.errors){
                console.log('error', err.errors[key].message);
                request.flash('registration', err.errors[key]);
            }
            response.redirect('/mongooses/edit/'+request.params.id);
        }
        else{
            response.redirect('/')
        }

    })
})

app.post('/mongooses', function(request, response){
    Animal.create(request.body, function(err, result){
        if (err){
            for(var key in err.errors){
                console.log('error', err.errors[key].message);
                request.flash('registration', err.errors[key]);
            }
            response.redirect('/mongooses/new');
        }
        else{
            response.redirect('/');

        }
    })
})

app.get('/mongooses/:id', function(request, response){
    console.log('request.params' , request.params);
    Animal.find({_id: request.params.id}, function(err, result_animal){
        if (err){
            console.log('Finding Error during the connection to the db ', err);
            response.redirect('/');
        }
        response.render('mongooses', {result: result_animal});
    })
})

app.get('/mongooses/edit/:id', function(request, response){
    Animal.find({_id: request.params.id}, function(err, result_animal){
        if (err){
            console.log('Finding Error during the connection to the db ', err);
            response.redirect('/');
        }
        response.render('edit', {result: result_animal});
    })
})

app.get('/mongooses/destroy/:id', function(request, response){
    Animal.remove({_id: request.params.id}, function(err, result_animal){
        if (err){
            console.log('Finding Error during the connection to the db ', err);
        }
        response.redirect('/');
    })
})




// tell the express app to listen on port 8000, always put this at the end of your server.js file
app.listen(8000, function() {
  console.log("listening on port 8000");
})

