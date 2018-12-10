var mongoose = require('mongoose');

mongoose.Promise = global.Promise;


mongoose.connect('mongodb://deepti:test123@ds237563.mlab.com:37563/homeaway', { useNewUrlParser: true, poolSize:100, useCreateIndex: true, });
//mongoose.connect('mongodb://localhost:27017/Homeaway',{ useNewUrlParser: true, poolSize:100, useCreateIndex: true, });
module.exports = {mongoose};
