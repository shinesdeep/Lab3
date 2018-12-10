const graphql = require('graphql');
var {mongoose} = require('../mongoose');
 var {Profiles} = require('../models/profile');
 var {Bookings} = require('../models/bookings');
 var {Listings} = require('../models/listings');
 var crypt = require('../crypt');
 var session = require('express-session');
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} = graphql;

const ProfileType = new GraphQLObjectType({
    name: 'userprofile',
    fields: () => ({
        username : {type: GraphQLString},
        password : {type: GraphQLString},
        firstname : {type: GraphQLString},
        lastname : {type: GraphQLString},
        email : {type: GraphQLString},
        role : {type: GraphQLString},
        phone: {type: GraphQLString},
        aboutme: {type: GraphQLString},
        city: {type: GraphQLString},
        company: {type: GraphQLString},
        school: {type: GraphQLString},
        home: {type: GraphQLString},
        language: {type: GraphQLString},
        gender: {type: GraphQLString},
    })
});


const BookingType = new GraphQLObjectType({
    name: 'booking',
    fields: () => ({
        bookingId : {type: GraphQLString},
        listingId : {type: GraphQLString},
        startDate : {type: GraphQLString},
        endDate : {type: GraphQLString},
        owner : {type: GraphQLString},
        guest: {type: GraphQLString},
        username: {type: GraphQLString},
        price: {type: GraphQLString},
        headline: {type: GraphQLString},
        propdes: {type: GraphQLString},
        bedrooms: {type: GraphQLInt},
        accomodates: {type: GraphQLInt},
        bathrooms: {type: GraphQLString},
        description: {type: GraphQLString},
        listingPic1: {type: GraphQLString},
        proptype: {type: GraphQLString},
        listingPic2: {type: GraphQLString},
        listingPic3: {type: GraphQLString},
        listingPic4: {type: GraphQLString},
        listingPic5: {type: GraphQLString},
        listingPic6: {type: GraphQLString},
        
    })
});


const ListingType = new GraphQLObjectType({
    name: 'listing',
    fields: () => ({
        listingId :  {type: GraphQLString},
        street :     {type: GraphQLString},
        city :       {type: GraphQLString},
        progBarVal : {type: GraphQLString},
        states :     {type: GraphQLString},
        country:     {type: GraphQLString},
        headline:    {type: GraphQLString},
        modify:      {type: GraphQLString},
        username:    {type: GraphQLString},
        propdes:     {type: GraphQLString},
        bedrooms:    {type: GraphQLInt},
        accomodates: {type: GraphQLInt},
        price: {type: GraphQLString},
        bathrooms:   {type: GraphQLString},
        description: {type: GraphQLString},
        listingPic1: {type: GraphQLString},
        proptype:    {type: GraphQLString},
        listingPic2: {type: GraphQLString},
        listingPic3: {type: GraphQLString},
        listingPic4: {type: GraphQLString},
        listingPic5: {type: GraphQLString},
        listingPic6: {type: GraphQLString},
        
    })
});



const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        getprofile : {
            type: ProfileType,
            args: { username: { type: GraphQLString} },
            resolve(parent, args){
                return  Profiles.findOne({username:args.username})
            }
        },
        gettravdash :{
            type : new GraphQLList(BookingType),
            args : {username :{type : GraphQLString}},
            resolve(parent, args){
                console.log("Get Traveler Dashboard",args.username);
                return Bookings.find({
                    username : args.username
                })
            }
        } ,
        getownerdash :{
            type : new GraphQLList(ListingType),
            args : {username :{type : GraphQLString}},
            resolve(parent, args){
                console.log("Get Owner Dashboard");
                return Listings.find({
                    username : args.username
                })
            }
        } 
    }
});




const Mutation = new GraphQLObjectType({
 name : 'Mutation',
 fields :{
     Register: {
         type : ProfileType,
         args: {
            username : {type: new GraphQLNonNull(GraphQLString)},
            password : {type: new GraphQLNonNull(GraphQLString)},
            firstname : {type: new GraphQLNonNull(GraphQLString)},
            lastname : {type: new GraphQLNonNull(GraphQLString)},
            email : {type: new GraphQLNonNull(GraphQLString)},
            role : {type: new GraphQLNonNull(GraphQLString)},
         },
         resolve(parent, args){
            var passwordHash;
            return  crypt.createHash(args.password, function (response) {
            passwordHash = response;
           
            var profile = new Profiles({
                username: args.username,
                password: passwordHash,
                firstname: args.firstname,
                lastname : args.lastname,
                email : args.email,
                role : args.role
            });
            console.log("Create a new profile");
             profile.save();
         
        }) 
         }
     },
     UpdateProfile : {
         type : ProfileType,
         args : {
                _id :{type : GraphQLID },
                username : {type: GraphQLString},
                firstname:{type: GraphQLString },
                lastname:{type: GraphQLString },
                //email:{type: GraphQLString },
                phone : {type: GraphQLString },
                aboutme : {type: GraphQLString },
                city : {type: GraphQLString },
                company : {type: GraphQLString },
                school : {type: GraphQLString },
                home : {type: GraphQLString },
                language : {type: GraphQLString },
                gender : {type: GraphQLString },
           
       
           },
           resolve(parent, args){
            var profile = new Profiles({
                firstname:args.firstname,
                lastname:args.lastname,
                //email:args.email,
                phone : args.phone,
                aboutme : args.aboutme,
                city : args.city,
                company : args.company,
                school : args.school,
                home : args.home,
                language : args.language,
                gender : args.gender,
           })
           console.log("Update profile", args.username);
            return Profiles.findOneAndUpdate({
                username:args.username
            }, { $set: { firstname:args.firstname,lastname:args.lastname, phone: args.phone , city: args.city, aboutme  : args.aboutme,
                company: args.company, school : args.school, home : args.home,language : args.language, gender : args.gender,}} ) 



         }
     },
     //next mutation
 }
 
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});