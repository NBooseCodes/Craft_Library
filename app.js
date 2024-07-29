// SETUP SECTION

var express = require('express');
var app = express();
PORT = 21211
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
    let check_user = `SELECT COUNT(*) FROM UserInfo WHERE username = ? AND password = ?`; 

    db.pool.query(check_user, [username, password], function(err, result) {
        console.log(result)
        if (result[0]['COUNT(*)'] == 1) {
            res.redirect('home');
        } else {
            res.render('login');
        }
    })
})

// HOME PAGE ROUTE
app.get('/home', function(req, res){
    res.render('home');
})

app.post('/register', function(req, res) {
    res.render('register');
})

app.post('/register-user', function(req, res) {
    console.log("hit reg user");
    let data = req.body;
    let firstName = data.firstName;
    let lastName = data.lastName;
    let username = data.username;
    let password = data.password;

    // Now add user to db

    let addUserQuery = `INSERT INTO UserInfo (firstName, lastName, username, password) VALUES (?, ?, ?, ?)`;
    db.pool.query(addUserQuery, [data.firstName, data.lastName, data.username, data.password], function(err) {
        res.redirect('home');
    })
})
// Listender
app.listen(PORT, function(){
    console.log('Express started on port ' + PORT);
})