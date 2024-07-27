var mysql = require('mysql');
var pool = mysql.createPool({
    connectionLimit : 10,
    host : 'classmysql.engr.oregonstate.edu',
    user : 'cs361_boosen',
    password : '5885',
    database : 'cs361_boosen'
})

module.exports.pool = pool;