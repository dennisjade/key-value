'use strict';

var Promise = require('bluebird');
var DB = require('../helpers/db');
var util = require('../helpers/util');
var Schema = DB.mongoose.Schema;

// create a schema
var keyvalueSchema = new Schema({
  key: { type: String, required: true, unique: true },
  value: { type: String, required: true },
  timestamp: { type: Number, required: true, default: new Date().getTime()}
});
var KeyValue = DB.mongoose.model('KeyValue',keyvalueSchema);

module.exports = {
  save: save,
  findKey: findKey
};

/**
 * Tries to save the key value pair in the DB
 * @param body Object
 * @returns Promise
 */
function save (body) {
  return new Promise(function (resolve, reject){
    var data;
    var formatted = util.formatKeyValue(body); // verify and parse the data sent

    // reject if there is a error property
    if (formatted.error){
      return reject(formatted.error)
    }

    data = {
      key: formatted.key.toLowerCase(),
      value: formatted.value,
      timestamp: new Date().getTime() // this is already in UTC
    };

    // execute saving to DB
    KeyValue.collection.insert(data)
      .then(function () {
        return resolve(data);
      })
      .catch(function (err) {
        return reject(err);
      })
  })
}

/**
 * Finds a match key-value pair in our db
 * @param key String
 * @param timestamp Number
 */
function findKey (key, timestamp) {
  return new Promise(function (resolve, reject) {
    var data = null;
    var query = {
      key: key.toLowerCase()
    };


    // add additional timestamp condition when looking for a value
    if (timestamp) {
      query.timestamp = {
        $lte: timestamp
      }
    }

    // we will only need to return the latest value
    KeyValue.findOne(query)
      .sort({ timestamp : -1 } )
      .then(function (res) {
        if (res) {
          delete res._doc._id;
          data = res._doc;
        }
        return resolve(data);
      })
      .catch(function(err){
        return reject(err);
      })
  })
}