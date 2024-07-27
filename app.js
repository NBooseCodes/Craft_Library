// SETUP SECTION

var express = require('express');
var app = express();
PORT = 21210
var db = require('./database/db-connection')

// Routes
app.get('/', function(req, res){
    res.send('Server is up and running');
})

// Listender
app.listen(PORT, function(){
    console.log('Express started on port ' + PORT);
})