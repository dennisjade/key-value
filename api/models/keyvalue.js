'use strict';

var Promise = require('bluebird');
var DB = require('../helpers/db');
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
 * @param key String
 * @param value String
 * @returns Promise
 */
function save (key, value) {
  return new Promise(function (resolve, reject){
    var data = {
      key: key,
      value: value,
      timestamp: new Date().getTime()
    };

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
      key: key
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