// SETUP SECTION

var express = require('express');
var app = express();
PORT = 21210
var db = require('./database/db-connection')

// Plug in to Handlebars

const {engine} = require('express-handlebars');
var exphbs = require('express-handlebars'); // Import handlebars
app.engine('.hbs', engine({extname: ".hbs"})); // Create handlebars instance on which we can do work
app.set('view engine', '.hbs'); // Tell express to use handlebars when it encounters a .hbs file

// Routes
app.get('/', function(req, res){
    res.render('home');
})

// Listender
app.listen(PORT, function(){
    console.log('Express started on port ' + PORT);
})