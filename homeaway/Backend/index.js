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
            
            
    //         var sql = "SELECT *  FROM profile WHERE username = " + 
    //                 mysql.escape(username) ;

                    
            
    //         console.log("sql :", sql);        
    //         pool.getConnection(function(err,con){
    //             if(err){
    //                     res.status(401).json({
    //                         success: false,
    //                         message: 'Could Not Get Connection Object'
    //                     });
    //                     res.end("Could Not Get Connection Object");
    //             }else{
    //             con.query(sql,function(err,result){
    //             if(err){
    //                 res.writeHead(400,{
    //                     'Content-Type' : 'text/plain'
    //                 })
    //                 res.end("Invalid Credentials");
    //             }else{
                    
    //                 console.log("Value of result password  is : ", result[0].password);
    //                 crypt.compareHash(password, result[0].password, function (err, isMatch) {
    //                    if (isMatch && !err) {

                            
                            
    //                         res.cookie('cookie',username,{maxAge: 900000, httpOnly: false, path : '/'});
    //                         req.session.user = result[0];
    //                         res.status(200).json({
    //                             success: true,
    //                             message: 'Successful Login'
    //                         });
    //                          //res.end("Successful Login");
                             
    //                          console.log("Login Successful");  
                        
    //                     }
    //                     else{
    //                         res.status(401).json({
    //                             success: false,
    //                             message: 'Authentication failed. Passwords did not match.'
    //                         });
    //                         //res.end("Authentication failed. Passwords did not match.");

    //                         console.log("Authentication failed. Passwords did not match.");

    //                     } 
                         

    //                 })     
                    
                    
    //             }
    //         });

    //     }
        
    // })
    
    
   
       
    
    
});



app.use("/graphql",graphqlHTTP({
    schema,
    graphiql: true,
}));



// app.post('/register',function(req,res){
//     console.log("Inside Register User Handler");
    
//      var username = req.body.username;
//      var password = req.body.password;
//      var firstname = req.body.firstname;
//      var lastname = req.body.lastname;
//      var email = req.body.email;
//      var role = req.body.role;

//     var passwordHash;
//     crypt.createHash(password, function (response) {
//     passwordHash = response;
    
//     console.log("Encrypted Password id : ", passwordHash );
     
//     var profile = new Profiles({
//         username: username,
//         password: passwordHash,
//         firstname: firstname,
//         lastname : lastname,
//         email : email,
//         role : role,

//     })
    
    
//     // Profiles.findOne({
//     //     username:username
//     // }, function(err,user){
//         // if (err) {
              
//         //     res.code = "400";
//         //     res.value = "Something happened. Try Again !!";
//         //     console.log(res.value);
//         //     res.sendStatus(400).end();
            
       
//         // } else if(user){

//         //     res.code = "406";
//         //     res.value = "Username already exist. Try Again !!";
//         //     console.log(res.value);
//         //     res.sendStatus(400).end();
     
        
//         // }  
//         //else{

//             console.log("Create a new profile")
//             profile.save().then((profile)=>{
//                 console.log("User created : ",profile);
//                 res.sendStatus(200).end();
//             },(error)=>{
//                 console.log("Error Creating User");
//                 res.sendStatus(400).end();
//             })
//         //}  
        
//    // })  

    
    
    
   

// })


// });


// app.get('/profile', function(req,res){
    
//     let username = req.query.username;
    
//     console.log("Inside Get Profile Handler is :", req.query.username);

//     var sql = "SELECT * FROM profile where username="+mysql.escape(username)+" ";
    
//     //console.log("sql :", sql);
//     pool.getConnection(function(err,con){
//         if(err){
//             res.writeHead(400,{
//                 'Content-Type' : 'text/plain'
//             })
//             res.end("Could Not Get Connection Object");
//         }else{

//         con.query(sql,function(err,result){
//             console.log(result);
//             if(err ){
//                 res.status(401).json({
//                     success: false,
//                     message: 'Error could not get Profile'
//                 });
//             res.end("Error while retrieving Profile Details");
//             }else{
                
//                 if(result[0].username === username){

//                 console.log("Profile resul[0] :",result[0])
//                 // res.status(200).json({
//                 //     success: true,
//                 //     message: 'Profile Found'
//                 // });
//                 res.end(JSON.stringify(result[0]));
//                 console.log("result JSON .parse is :", result[0]);

//             }
//             else{
//                 res.status(400).json({
//                     success: false,
//                     message: 'Profile not Found'
//                 });

//             }

//         }

//         });
   
//         }
//     })
//     console.log("Going out of get Profile Handler");
// })



// app.post('/profile',function(req,res){
//     console.log("Inside Profile update Handler");
    
//      var username = req.body.username;
//      var firstname = req.body.firstname;
//      var lastname = req.body.lastname;
//      var email = req.body.email;
//      var phone = req.body.phone;
//      var aboutme = req.body.aboutme;
//      var city = req.body.city;
//      var company = req.body.company;
//      var school = req.body.school;
//      var home = req.body.home;
//      var language = req.body.language;
//      var gender = req.body.gender;
//     console.log("email is ", email);
//     if(email){
//     var sql = "update profile  set firstname= "+mysql.escape(firstname)
//     +" , lastname="+mysql.escape(lastname)+" , email= " 
//     +mysql.escape(email)+ " , phone="+mysql.escape(phone) + " ,aboutme= "
//     + mysql.escape(aboutme) +", city= "+ mysql.escape(city)+ ", company= "+ mysql.escape(company)+
//     ", school= "+ mysql.escape(school)+ ", home= "+ mysql.escape(home)+ ", language= "+ 
//     mysql.escape(language)+", gender= "+ mysql.escape(gender) + " where username= "+mysql.escape(username);
    


//     //console.log("SQL is ", sql);

//     pool.getConnection(function(err,con){
//         if(err){
//             res.writeHead(400,{
//                 'Content-Type' : 'text/plain'
//             })
//             res.end("Could Not Get Connection Object");
//         }else{
    
//             con.query(sql,function(err,result){
//                 if(err){
//                     res.writeHead(400,{
//                         'Content-Type' : 'text/plain'
//                     })
//                     res.end("Error in Updating Profile. Try Again !!");
//                 }else{
                    
//                     //res.cookie('cookie',username,{maxAge: 900000, httpOnly: false, path : '/'});
//                     req.session.user = result;
//                     res.writeHead(200,{
//                         'Content-Type' : 'text/plain'
//                     })
//                     res.end('Update  Successful');
//                 }
//             });
//             console.log("out of Profile handler")

//         }
//     })
// }    

// });



// app.post('/upload', upload.single('selectedFile'), (req, res) => {
//     console.log(" Inside upload")
//     console.log("Req : ",req); 
//     console.log(" Req Filename :",req.file.filename);
//     console.log(" Req Filename :", req.body.username);
//     let filename = req.file.filename;
//     let username = req.body.username;
//     var sql = "update profile  set profile_pic= "+mysql.escape(filename)
//          + " where username= "+mysql.escape(username);
    
//          pool.getConnection(function(err,con){
//             if(err){
//                 res.writeHead(400,{
//                     'Content-Type' : 'text/plain'
//                 })
//                 res.end("Could Not Get Connection Object");
//             }else{
        
//                 con.query(sql,function(err,result){
//                     if(err){
//                         res.writeHead(400,{
//                             'Content-Type' : 'text/plain'
//                         })
//                         res.end("Error in file Upload. Try Again !!");
//                     }else{
//                         console.log("Updated in DB Successfully");
//                         //res.cookie('cookie',username,{maxAge: 900000, httpOnly: false, path : '/'});
//                         res.writeHead(200,{
//                             'Content-Type' : 'text/plain'
//                         })
//                         res.end('File upload  Successful');
//                     }
//                 });
//                 console.log("out File upload handler")
    
//             }
//         })
// });



// app.post('/multiupload', upload.any(), (req, res) => {
//     console.log("Req  files : ",req);
//     //console.log("Res : ",res.file);
//     var username = req.body.username;
//     var listingId = req.body.listingId;
    
//     console.log("num of files",req.files.length);
//     let picnum = '', j;
//     for(let i=0;i<req.files.length;i++){
//         j=i+1;
//         picnum += "listingPic"+j+"="+mysql.escape(req.files[i].path)+ " , "
        
        

//     }
//     picnum += " progBarVal="+mysql.escape(req.body.progBarVal);
//     var sql = "update listings  set "+picnum+" where username ="+ mysql.escape(username)+" and listingId="+mysql.escape(listingId)+""; 

//     console.log("sql : ", sql);
    
//     pool.getConnection(function(err,con){
//         if(err){
//             res.writeHead(400,{
//                 'Content-Type' : 'text/plain'
//             })
//             res.end("Could Not Get Connection Object");
//         }else{
    
//             con.query(sql,function(err,result){
//                 if(err){
//                     res.writeHead(400,{
//                         'Content-Type' : 'text/plain'
//                     })
//                     res.end("Error in file Upload. Try Again !!");
//                 }else{
//                     console.log("Updated in DB Successfully");
//                     //res.cookie('cookie',username,{maxAge: 900000, httpOnly: false, path : '/'});
//                     res.writeHead(200,{
//                         'Content-Type' : 'text/plain'
//                     })
//                     res.end('File upload  Successful');
//                 }
//             });
//             console.log("out File upload handler")

//         }
//     })
// });






// app.post('/download/:file(*)',(req, res) => {
//     console.log("Inside download file");
//     var file = req.params.file;
//     var fileLocation = path.join(__dirname + '/uploads',file);
//     var img = fs.readFileSync(fileLocation);
//     var base64img = new Buffer.from(img).toString('base64');
//     res.writeHead(200, {'Content-Type': 'image/jpg' });
//     res.end(base64img);



//   });



// app.post('/ownupdate', (req, res) => {
 
//     console.log("Inside owner address update");
//     console.log("Req  files : ",req);
    
    
//     var username = req.body.username;
//     var listingId = req.body.listingId;
//     var progBarVal = req.body.progBarVal; 
//     if(req.body.addressform)
//     {
        

//         var street = req.body.street;
//         var states = req.body.states;
//         var city = req.body.city;
//         var country = req.body.country;

//     if(listingId) {
        
//         console.log("Inside owner form address update");
       
//         //var progBarVal = req.body.progBarVal;
     
//        var sql = "update listings  set street="+mysql.escape(street)
//        +" , states="+mysql.escape(states)+" , city="+mysql.escape(city)+" , country="
//        + mysql.escape(country)+", progBarVal= "+ mysql.escape(progBarVal)+" where username="
//        +mysql.escape(username)+" and listingId="+mysql.escape(listingId)+""; 
//     }
//     else{
//            //Randonmly generate an Id and Insert
//            listingId = Math.random().toString(36).substr(2, 9);
//            console.log("listinId : ", listingId);
//             var sql =   "INSERT INTO listings (listingId ,username, street, city, states, country, progBarVal)  VALUES ( " + 
//             mysql.escape(listingId) + " , "+ mysql.escape(username) + " , " + mysql.escape(street) + " , " 
//             + mysql.escape(city) + " , " + mysql.escape(states) + " , "
//             + mysql.escape(country) + ", "+ mysql.escape(progBarVal)+ " ) ";   
          
//          }


//     } 
//     else if(req.body.propform){
        
        

//             //proptype
//            console.log("Inside prop form  update"); 
//            var headline = req.body.headline;
//            var propdes = req.body.propdes;
//            var proptype = req.body.proptype;
//            var bedrooms = req.body.bedrooms;
//            var accomodates = req.body.accomodates;
//            var bathrooms = req.body.bathrooms;
//          //console.log("proptype",req.body.proptype );
//           var sql = "update listings  set headline= "+mysql.escape(headline)
//           +" , propdes="+mysql.escape(propdes)+" , proptype= " 
//           +mysql.escape(proptype)+" , bedrooms="+mysql.escape(bedrooms)+" ,accomodates="
//           + mysql.escape(accomodates)+",bathrooms="
//           + mysql.escape(bathrooms) +", progBarVal="+ mysql.escape(progBarVal)+" where username= "
//           +mysql.escape(username)+" and listingId="+mysql.escape(listingId)+"";
         
        
         
        
//     }
//     else if(req.body.bookopt){

//          var instant = req.body.instant;
//          var price = req.body.price;

//          sql = "update listings  set instant= "+mysql.escape(instant)
//          +" , price="+mysql.escape(price)+"  where username= "
//          +mysql.escape(username)+" and listingId="+mysql.escape(listingId)+"";

//     }
//         console.log("SQL is ", sql);

//         pool.getConnection(function(err,con){
//         if(err){
//             res.writeHead(400,{
//                 'Content-Type' : 'text/plain'
//             })
//             res.end("Could Not Get Connection Object");
//         }else{
    
//             con.query(sql,function(err,result){
//                 if(err){
//                     res.writeHead(400,{
//                         'Content-Type' : 'text/plain'
//                     })
//                     res.end("Error in Updating Owner. Try Again !!");
//                 }else{
//                     console.log(" Prop Update completed ");
//                     req.session.user = result;
//                     res.writeHead(200,{
//                         'Content-Type' : 'text/plain'
//                     })
//                     res.end('Update  Successful');
//                 }
//             });
            

//         }
//     })
  
//     console.log("out of Ownupdate handler") 
    
// })
 


// app.get('/ownupdate', function(req,res){
    
//     console.log("Inside owner get request");
//     //console.log("Req  files : ",req);

//     let username = req.query.username;
//     let listingId = req.query.listingId;
    
//     console.log("Inside Get Profile Handler is :", req.query.username);
//     console.log("Inside Get Profile Handler is :", req.query.listingId);
    
//     if(listingId){
//     var sql = "SELECT * FROM listings where username="+mysql.escape(username)+"and listingId="+mysql.escape(listingId)+"  ";
//     }
//     else{

//         var sql = "SELECT * FROM listings where username="+mysql.escape(username)+"and progBarVal!='100%'" ;

//     }
//     console.log("sql :", sql);
//     pool.getConnection(function(err,con){
//         if(err){
//             res.writeHead(400,{
//                 'Content-Type' : 'text/plain'
//             })
//             res.end("Could Not Get Connection Object");
//         }else{

//         con.query(sql,function(err,result){
//             console.log(result);
//             if(err ){
//                 res.status(401).json({
//                     success: false,
//                     message: 'Error could not get Profile'
//                 });
//             res.end("Error while retrieving Profile Details");
//             }else{
                
//             if(result[0]){
                
//                 console.log("Listing found result[0] :");
//                 // res.status(200).json({
//                 //     success: true,
//                 //     message: 'Profile Found' ,result[0]
//                 // });
//                 res.end(JSON.stringify(result[0]));
//                 //console.log("result JSON .parse is :", result[0]);

//             }
//             else{
//                 res.status(400).json({
//                     success: false,
//                     message: 'Listing not Found'
//                 });
//                 //console.log("Listing not found, Create new Listing");

//             }

//         }

//         });
   
//         }
//     })
//     console.log("Going out of get Owner ");
// })



// app.get('/owndash', function(req,res){
    
//     console.log("Inside owner Dashboard");
//     //console.log("Req  files : ",req);

//     let username = req.query.username;
    
    
    
    
//     var sql = "SELECT * FROM listings where username="+mysql.escape(username)+"and progBarVal='100%' ";
    
   
//     console.log("sql :", sql);
//     pool.getConnection(function(err,con){
//         if(err){
//             res.writeHead(400,{
//                 'Content-Type' : 'text/plain'
//             })
//             res.end("Could Not Get Connection Object");
//         }else{

//         con.query(sql,function(err,result){
//             console.log(result);
//             if(err ){
//                 res.status(401).json({
//                     success: false,
//                     message: 'Error could not get Profile'
//                 });
//             res.end("Error while retrieving Profile Details");
//             }else{
                
//             if(result[0]){
                
//                 console.log("Listing found result[0] :",result[0]);
               
//                 res.end(JSON.stringify(result));
//                 //console.log("result JSON .parse is :", result[0]);

//             }
//             else{
//                 res.status(400).json({
//                     success: false,
//                     message: 'Listing not Found'
//                 });
                

//             }

//         }

//         });
   
//         }
//     })
//     console.log("Going out of get Owner Dashboard");
// })

// app.get('/navbar', function(req,res){
    
//     console.log("Inside nav bar ");
//     //console.log("Req  files : ",req);

//     let username = req.query.username;
    
    
    
    
//     var sql = "SELECT * FROM profile where username="+mysql.escape(username);
    
   
//     console.log("sql :", sql);
//     pool.getConnection(function(err,con){
//         if(err){
//             res.writeHead(400,{
//                 'Content-Type' : 'text/plain'
//             })
//             res.end("Could Not Get Connection Object");
//         }else{

//         con.query(sql,function(err,result){
//             console.log(result);
//             if(err ){
//                 res.status(401).json({
//                     success: false,
//                     message: 'Error could not get user'
//                 });
//             res.end("Error while retrieving user Details");
//             }else{
                
//             if(result[0]){
                
//                 console.log("Listing found result[0] :",result[0]);
                
//                 res.end(JSON.stringify(result[0]));
//                 //console.log("result JSON .parse is :", result[0]);

//             }
//             else{
//                 res.status(400).json({
//                     success: false,
//                     message: 'User not Found'
//                 });
//                 //console.log("Listing not found, Create new Listing");

//             }

//         }

//         });
   
//         }
//     })
//     console.log("Going out of nav bar ");
// })


// app.get('/travdash', function(req,res){
    
//     console.log("Inside Traveler Dashboard");
//     //console.log("Req  files : ",req);

//     let username = req.query.username;

    
//     var sql = "SELECT * FROM bookings where username="+mysql.escape(username);
    
   
//     console.log("sql :", sql);
//     pool.getConnection(function(err,con){
//         if(err){
//             res.writeHead(400,{
//                 'Content-Type' : 'text/plain'
//             })
//             res.end("Could Not Get Connection Object");
//         }else{

//         con.query(sql,function(err,result){
//             console.log(result);
//             if(err ){
//                 res.status(401).json({
//                     success: false,
//                     message: 'Error could not get Traveler'
//                 });
//             res.end("Error while retrieving Traveler Details");
//             }else{
                
//             if(result[0]){
                
//                 console.log("Listing found result[0] :",result[0]);
                
//                 res.end(JSON.stringify(result));
//                 //console.log("result JSON .parse is :", result[0]);

//             }
//             else{
//                 res.status(400).json({
//                     success: false,
//                     message: 'Listing not Found'
//                 });
                

//             }

//         }

//         });
   
//         }
//     })
//     console.log("Going out of Trav Dash");
// })




// app.get('/searchprop', function(req,res){
    
//     console.log("Inside property search");
//     //console.log("Req  files : ",req);

//     let dest = req.query.dest;
//     let startDate = req.query.startDate;
//     let endDate = req.query.endDate;
//     let guest = req.query.guest; 
    
    
    
//     var sql = "SELECT * FROM listings where accomodates>="+mysql.escape(guest)+" and progBarVal='100%' ";
    
   
//     console.log("sql :", sql);
//     pool.getConnection(function(err,con){
//         if(err){
//             res.writeHead(400,{
//                 'Content-Type' : 'text/plain'
//             })
//             res.end("Could Not Get Connection Object");
//         }else{

//         con.query(sql,function(err,result){
//             console.log(result);
//             if(err ){
//                 res.status(401).json({
//                     success: false,
//                     message: 'Error could not get Profile'
//                 });
//             res.end("Error while retrieving Profile Details");
//             }else{
                
//             if(result[0]){
                
//                 console.log("Listing found result[0] :",result[0]);
                
//                 res.end(JSON.stringify(result));
//                 //console.log("result JSON .parse is :", result[0]);

//             }
//             else{
//                 res.status(400).json({
//                     success: false,
//                     message: 'Listing not Found'
//                 });

//             }

//         }

//         });
   
//         }
//     })
//     console.log("Going serach property");
// })


// app.post('/book',function(req,res){
//     console.log("Inside Booking Handler");
    
//      var username = req.body.username;
//      var listingId = req.body.listingId;
//      var startDate = req.body.startDate;
//      var endDate = req.body.endDate;
//      var guest = req.body.guest;
//      var bookingId = Math.random().toString(36).substr(2, 9);
//      var price = req.body.price;
//      var headline = req.body.headline;
//      var propdes = req.body.propdes;
//     var  listingPic1 = req.body.listingPic1;

    
//     var sql = "INSERT INTO bookings (bookingId, listingId, startDate, endDate, guest, username, price, headline, propdes,listingPic1)  VALUES ( " + 
//     mysql.escape(bookingId) + " , " + mysql.escape(listingId) + " , " 
//     + mysql.escape(startDate) + " , " + mysql.escape(endDate) + " , "
//     + mysql.escape(guest) + " , " + mysql.escape(username) + " , " + "'"+mysql.escape(price)+"'" +" , " + mysql.escape(headline) + " , " + mysql.escape(propdes)+ ","+ mysql.escape(listingPic1)+  " ) ";
   
//     console.log("sql : ", sql);
//     pool.getConnection(function(err,con){
//         if(err){
//             res.writeHead(400,{
//                 'Content-Type' : 'text/plain'
//             })
//             res.end("Could Not Get Connection Object");
//         }else{
    
//             con.query(sql,function(err,result){
//                 if(err){
//                     res.writeHead(400,{
//                         'Content-Type' : 'text/plain'
//                     })
//                     res.end("Error in Booking . Try Again !!");
//                 }else{
//                     console.log(" Bookin Successful");
//                     req.session.user = bookingId;
//                     res.writeHead(200,{
//                         'Content-Type' : 'text/plain'
//                     })
//                     res.end('Booking Successful');
//                 }
//             });
//             console.log("out of booking handler")

//         }
//     })
    


// });






//start your server on port 3001
app.listen(3001);
console.log("Server Listening on port 3001");
