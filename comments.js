// Create web server

// Import modules
var http = require('http');
var fs = require('fs');
var qs = require('querystring');
var ejs = require('ejs');
var settings = require('./settings');
var mysql = require('mysql');

// Create server
var server = http.createServer();
var connection = mysql.createConnection({
    host: settings.host,
    user: settings.user,
    password: settings.password,
    database: settings.database
});

// Read template file
var template = fs.readFileSync(__dirname + '/public_html/bbs.ejs', 'utf-8');

// Read data from database
function getComments(callback) {
    connection.query('SELECT * FROM comments',
    function (error, results) {
        callback(results);
    });
}

// Add data to database
function addComment(data, callback) {
    connection.query('INSERT INTO comments SET ?',
    data, function (error, results) {
        callback();
    });
}