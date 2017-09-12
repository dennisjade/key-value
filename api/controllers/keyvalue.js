'use strict';

var KeyValueModel = require('../models/keyvalue');

module.exports = {
  getValue: getValue,
  saveObject: saveObject
};

/**
 * @api {get} /object/:key?timestamp=12 Request value information
 * @apiName findKey
 * @apiGroup KeyValue
 *
 * @apiParam {String} key Key of the document.
 * @apiParam {Number} timestamp Timestamp of the document.
 *
 * @apiSuccess {Object} The value of the key and/or timestamp. i.e. {value:''}
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
 * @api {post} /object Save key-value pair
 * @apiName saveObject
 * @apiGroup KeyValue
 *
 * @apiParam {String} key Key of the document.
 * @apiParam {String} value Value of the document.
 *
 * @apiSuccess {Object} The document being saved. i.e. {key:'',value:'',timestamp:12}
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