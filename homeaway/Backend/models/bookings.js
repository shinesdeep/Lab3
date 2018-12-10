var mongoose = require('mongoose');

var Bookings = mongoose.model('Bookings',{
    bookingId :{
        type : String,
        unique : true, 
        required : true, 
        
    },
    listingId : {
        type : String
    },
    messages : [{
        sender :{type : String },
        message:{type: String }
     }],
    startDate : {
        type : String
    },
    endDate : {
        type : String
    },
    owner : {
        type : String
    },
    guest : {
        type : String
    },
    username : {
        type : String
    },
    price : {
        type : String
    },
    headline : {
        type : String
    },
    propdes : {
        type : String
    },
    bedrooms : {
        type : Number
    },
    accomodates : {
        type : Number
    },
    bathrooms : {
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

module.exports = {Bookings};