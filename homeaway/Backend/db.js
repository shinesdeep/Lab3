// 'use strict';
// var mysql = require('mysql');
// var crypt = require('./crypt');
// //var config = require('../config/settings');
// var db = {};
// // Creating a connection object for connecting to mysql database
// // var connection = mysql.createConnection({
// //     host: config.database_host,
// //     port: config.database_port,
// //     user: config.database_user,
// //     password: config.database_password,
// //     database: config.database_name,
// //     socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock'
// // });

// //Connecting to database
// // connection.connect(function (err) {
// //     if (err) {
// //         console.error('error connecting: ' + err.stack);
// //         return;
// //     }

// //     console.log('connected as id ' + connection.threadId);
// // });

// db.createUser = function (user, successCallback, failureCallback) {
//     var passwordHash;
//     crypt.createHash(user.password, function (res) {
//         passwordHash = res;

//         connection.query("INSERT INTO cmpe273_usertable VALUES ( " + mysql.escape(Math.random())+ "," + mysql.escape(user.username) + " , " + mysql.escape(passwordHash) + " ); ",
//             function (err, rows, fields, res) {
//                 if (err) {
//                     console.log(err);
//                     failureCallback(err);
//                     return;
//                 }
//                 successCallback();
//             });
//     }, function (err) {
//         console.log(err);
//         failureCallback();
//     });
// };

// db.findUser = function (user, successCallback, failureCallback) {
//     var sqlQuery = "SELECT * FROM `cmpe273_demo`.`cmpe273_usertable` WHERE `username` = '" + user.username + "';";
//     connection.query(sqlQuery, function (err, rows, fields, res) {
//         if (err) {
//            failureCallback(err);
//             return;
//         }
//         if (rows.length > 0) {
//             successCallback(rows[0])
//         } else {
//             failureCallback('User not found.');
//         }
//     });
// };

// module.exports = db;