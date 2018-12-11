//import the require dependencies
var express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var cors = require('cors');
var crypt = require('./crypt');
var pool = require('./pool');
var db = require('./db');
var {mongoose} = require('./mongoose');
 var {Profiles} = require('./models/profile');
var {Listings} = require('./models/listings');
var {Bookings} = require('./models/bookings');
const multer = require('multer');
const uuidv4 = require('uuid/v4');
const path = require('path');
const fs = require('fs');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './uploads');
    },
    filename: (req, file, cb) => {

      //const newFilename = `test${path.extname(file.originalname)}`;
      cb(null, file.originalname);
    },
  });
  
const upload = multer({ storage });

var app = express();  

app.set('view engine', 'ejs');

var mysql = require('mysql');

//use cors to allow cross origin resource sharing
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

//use express session to maintain session data
app.use(session({
    secret              : 'cmpe273_kafka_passport_mongo',
    resave              : false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized   : false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration            : 60 * 60 * 1000,    // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration      :  5 * 60 * 1000
}));

app.use(bodyParser.urlencoded({extended: true }));
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));

//Allow Access Control
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
  });


 
//Route to handle Post Request Call
app.post('/login',function(req,res){
    
    console.log("Inside Login Post Request");
            var username = req.body.username;
            var password = req.body.password;
            console.log("Username",username);
            Profiles.findOne({
                username:username
            }, function(err,user){
                if (err) {
                    res.code = "400";
                    res.value = "Username not found. Try Again !!";
                    console.log("err response",err)
                    console.log(res.value);
                    //res.sendStatus(400).end(); 
                    res.end("error")
                } else if(user){
                   
                    console.log("user from mongo", user);
                    crypt.compareHash(password, user.password, function (err, isMatch) {
                    if (isMatch && !err) {
                        user.password = null;
                        var cookuser = {
                            username : user.username,
                            firstname : user.firstname,
                            lastname : user.lastname,
                            role : user.role
                        };

                        console.log("user from mongo", cookuser);
                        res.cookie('cookie',JSON.stringify(cookuser),{maxAge: 900000, httpOnly: false, path : '/'});
                        req.session.user = user;
                        res.status(200).json({
                            success: true,
                            user: user,
                            message: 'Successful Login'
                        });             
                         
                    }
                    else{
                            res.code = "401";
                            res.success = false;
                            res.message = 'Authentication failed. Passwords did not match.';
                            console.log("Authentication failed. Passwords did not match.");
                            res.end("Authentication failed. Passwords did not match.");
                    } 
                    }) 
                 
                }
                else{
                    console.log("user from mongo", user);
                    res.status(401).json({  
                        success: false,
                        message : 'User Not Found, Signup to Continue'
                    }); 
               
                }
                
            })          
            
 
});



app.use("/graphql",graphqlHTTP({
    schema,
    graphiql: true,
}));


//start your server on port 3001
app.listen(3001);
console.log("Server Listening on port 3001");
