var mongoose = require('mongoose');

var Listings = mongoose.model('Listings',{
    listingId :{
        type : String,
        unique : true, 
        required : true, 
        
    },
    street : {
        type : String
    },
    city : {
        type : String
    },
    progBarVal : {
        type : String
    },
    states : {
        type : String
    },
    country : {
        type : String
    },
    headline : {
        type : String
    },
    propdes : {
        type : String
    },
    bedrooms : {
        type : String
    },
    accomodates : {
        type : String
    },
    bathrooms : {
        type : String
    },
    modify : {
        type : String
    },
    username : {
        type : String
    },
    description : {
        type : String
    },
    listingPic1 : {
        type : String
    },
    proptype : {
        type : String
    },
    instant : {
        type : String
    },
    price : {
        type : String
    },
    listingPic2 : {
        type : String
    },
    listingPic3 : {
        type : String
    },
    listingPic4 : {
        type : String
    },
    listingPic5 : {
        type : String
    },
    listingPic6 : {
        type : String
    },
    listingPic1 : {
        type : String
    },

});

module.exports = {Listings};