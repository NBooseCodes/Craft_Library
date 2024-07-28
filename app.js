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
const path = require('path');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public'))); // The express.static middleware serves static files from the specified directory
// Routes

//LOGIN ROUTE
app.get('/', function(req, res){
    res.render('login');
})

// CHECK IF USER INFO IN DATABASE
app.post('/check-login-form', function(req, res) {
    let username = req.body.username;
    let password = req.body.password;
    console.log(username);
    console.log(password);
    let check_user = `SELECT COUNT(*) FROM UserInfo WHERE username = ? AND password = ?` 

    db.pool.query(check_user, [username], [password], function(err, result){
        console.log(result)
        res.redirect('home')

    })
})

// HOME PAGE ROUTE
app.get('/home', function(req, res){
    res.render('home');
})

// Listender
app.listen(PORT, function(){
    console.log('Express started on port ' + PORT);
})