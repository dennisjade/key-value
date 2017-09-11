'use strict';

var dbCreds = require('../../config/mongo-creds');
var mongoose = require('mongoose');
var bluebird = require('bluebird');
mongoose.Promise = bluebird;

// var db = mongoose.connection;
var dbUrl = 'mongodb://' + dbCreds.user + ':' + dbCreds.pwd + '@' + dbCreds.url + ':' + dbCreds.port
  + '/' +  dbCreds.dbname;

mongoose.connect(dbUrl, {useMongoClient: true, autoReconnect: true});

module.exports = {
  mongoose:mongoose
};