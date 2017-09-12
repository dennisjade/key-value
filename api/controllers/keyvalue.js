'use strict';

var KeyValueModel = require('../models/keyvalue');

module.exports = {
  getValue: getValue,
  saveObject: saveObject
};

/**
 * @description Get the latest value of the key being pass and/or the timestamp
 * @param req Request
 * @param res Response
 */
function getValue(req, res) {
  var key = req.swagger.params.key.value || {};
  var timestamp = req.swagger.params.timestamp.value || null;
  var ret = {};

  KeyValueModel.findKey(key, timestamp)
    .then(function (response) {
      if (response) {
        // remove unexpected properties
        delete response.__v;
        delete response.key;
        delete response.timestamp;
      } else {
        // in case nothing is found, we return empty value
        response = {
          value : ''
        }
      }
      res.json(response);
    })
    .catch(function (err){
      ret.message = 'Error';
      ret.data = JSON.stringify(err);
      res.status(500).json(ret);
    })
}

/**
 * @description Saves the key-value pair with the timestamp
 * @param req
 * @param res
 */
function saveObject(req, res) {
  var body = req.swagger.params.body.value || {};
  var ret = {};

  KeyValueModel.save(body.key, body.value)
    .then(function (response) {
      //remove non-expected field
      delete response._id;
      res.json(response);
    })
    .catch(function(err){
      ret.message = 'Error';
      ret.data = JSON.stringify(err);
      res.status(500).json(ret);
    });

}