'use strict';

var dbCreds = require('../../config/mongo-creds');
var mongoose = require('mongoose');
var bluebird = require('bluebird');

// we are advise to use other PROMISE as mongoose PROMISE will be depreciated already
mongoose.Promise = bluebird;

var dbUrl = 'mongodb://' + dbCreds.user + ':'
  + dbCreds.pwd
  + '@' + dbCreds.url
  + ':' + dbCreds.port
  + '/' +  dbCreds.dbname;

// useMongoClient set to true as some method as depreciated already
// autoReconnect here will try with 0 interval for 10 times in case it will be disconnected
mongoose.connect(dbUrl, {useMongoClient: true, autoReconnect: true});

module.exports = {
  mongoose:mongoose
};