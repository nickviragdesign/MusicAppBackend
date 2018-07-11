var mongoose = require('mongoose');

mongoose.Promise = require('bluebird');

mongoose.connect('mongodb://127.0.0.1:27017/testing')
.then(() => { console.log(`Succesfully Connected to the Mongodb Database at URL : mongodb://127.0.0.1:27017/testing`)})
.catch(() => { console.log(`Error Connecting to the Mongodb Database at URL : mongodb://127.0.0.1:27017/testing`)})
