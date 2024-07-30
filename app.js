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

// Route to get to register page
app.post('/register', function(req, res) {
    res.render('register');
})

// Route to add a user's info to our DB
app.post('/register-user', function(req, res) {
    console.log("hit reg user");
    let data = req.body;

    // Now add user to db

    let addUserQuery = `INSERT INTO UserInfo (firstName, lastName, username, password) VALUES (?, ?, ?, ?)`;
    db.pool.query(addUserQuery, [data.firstName, data.lastName, data.username, data.password], function(err) {
        res.redirect('home');
    })
})

// Renders add-yarn page so we can enter our information in our db
app.get('/add-yarn-button', function(req, res) {
    res.render('addYarn')
})

// Actually adds yarn info to our db
app.post('/add-yarn', function(req, res) {
    let data = req.body;
    let queryVarArr = [data.yarnBrand, data.yarnFiber, data.yarnWeight, data.yarnColorFamily];

    let addYarnQuery = `INSERT INTO Yarn (yarnBrand, yarnFiber, yarnWeight, yarnColorFamily,  `
    let valuesString = `(?, ?, ?, ?, `
    if (data.yarnColorName) {
        addYarnQuery += `yarnColorName, `
        valuesString += `?, `;
        queryVarArr.push(data.yarnColorName);
    }
    addYarnQuery += `inventory)`;
    valuesString += `?)`;
    queryVarArr.push(parseInt(data.inventory))
    let finalQuery = addYarnQuery + ` VALUES ` + valuesString;

    db.pool.query(finalQuery, queryVarArr, function(err) {
        if (err) {
            console.log(err)
            res.sendStatus(400)
        } else {
            console.log("Successfully added yarn");
            res.redirect('view-yarn-inventory');
        }
    })

})
app.post('/view-yarn-inventory', function(req, res) {
    console.log(req.body)
    let data = req.body;
    let query = `SELECT yarnID, yarnBrand, yarnWeight, yarnColorFamily FROM Yarn ORDER BY `
    if (data.sortYarn == "brandAZ") {
        query += `yarnBrand ASC`
    } else if (data.sortYarn == "brandZA") {
        query += `yarnBrand DESC`;
    } else if (data.sortYarn == "color") {
        query += `yarnColorFamily`;
    } else if (data.sortYarn == "yarnWeight") {
        query += `yarnWeight`
    }

    db.pool.query(query, function(error, rows) {
        let yarn=rows;
        return res.render('yarnInventory', {data: yarn});
    })
})


app.get('/view-yarn-inventory', function(req, res) {
    let inventoryQuery = `SELECT yarnID, yarnBrand, yarnWeight, yarnColorFamily FROM Yarn`;
    console.log(req.params.sortYarn)
    db.pool.query(inventoryQuery, function(error, rows) {
        let yarn = rows;
        return res.render('yarnInventory', {data: yarn});
    })
})

app.get('/yarnInfo', function(req, res) {
    let data = req.query;
    let yarnID = data.yarnID;
    console.log(yarnID)
    let yarnInfoQuery = `SELECT * FROM Yarn WHERE yarnID = ?`;
    db.pool.query(yarnInfoQuery, [data.yarnID], function(error, rows) {
        let yarnInfo = rows;
        console.log(yarnInfo)
        return res.render('yarnInfo', {yarn: yarnInfo});
    })
})

app.delete('/delete-yarn/:yarnID', function(req,res,next){
    // Deletes yarn based on ID sent over from table
    let deleteYarnQuery = `DELETE FROM Yarn WHERE yarnID = ?`;
          db.pool.query(deleteYarnQuery, [req.params.yarnID], function(error){
            if (error) {
                console.log(error);
                res.sendStatus(400);
            }
            else {
                res.sendStatus(204);
            }
    })
});
// Listener
app.listen(PORT, function(){
    console.log('Express started on port ' + PORT);
})