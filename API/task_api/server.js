// Load the express module and store it in the variable express (Where do you think this comes from?)
var express = require("express");
console.log("Let's find out what express is", express);
// invoke express and store the result in the variable app
var app = express();
var path = require("path");

app.use(express.static(path.join(__dirname, "./client/static")));
app.set('views', path.join(__dirname, './client/views'));
app.set('view engine', 'ejs');//means that the server has to find all the .ejs inside the view folder. 
// very important. we change all the html files to the ejs file.
// require body-parser to be able to use request form by writing request.body
var bodyParser = require('body-parser');
// use it!
app.use(bodyParser.urlencoded({extended: true}));

//configure body-parser to read JSON
//We need this for the api
app.use(bodyParser.json());


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

// set up other middleware, such as session
const flash = require('express-flash');
app.use(flash());
var validate = require('mongoose-validator');

// require the mongoose module
var mongoose = require('mongoose');
//open a connnexion to your db into the mongoDB and create it if not exist yet
mongoose.connect('mongodb://localhost/task_api_db');

// where the routes used to be, we're going to require routes.js
// since routes.js exports a function, server.js will receive that function
// invoke the function we get from the require and pass it app as an argument
require('./server/config/routes.js')(app); //the most important thing that the server has to know is to use the routes. 
//It's why we require the routes.js. because it's a function, we have to pass a argument app that we created above.


// tell the express app to listen on port 8000, always put this at the end of your server.js file
app.listen(8000, function() {
  console.log("listening on port 8000");
})

