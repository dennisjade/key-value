'use strict';
var expect = require('chai').expect;
var util = require('../../../api/helpers/util');

describe('helpers - util', function () {

  describe('formatKeyValue', function () {
    it('should return an error when the data is not an object', function() {
      var data = 'Not object';
      var response = util.formatKeyValue(data);
      expect(response).to.be.an('object');
      expect(response).to.have.property('error', 'Not a JSON object');
    });

    it('should return an error when data has more than 1 key-value pair', function () {
      var data = {
        1: 'One',
        '2': 2
      };
      var response = util.formatKeyValue(data);
      expect(response).to.be.an('object');
      expect(response).to.have.property('error', 'Data did not conform to the format given');
    });

    it('should return a key-value format', function () {
      var data = {
        1: 'One'
      };
      var response = util.formatKeyValue(data);
      expect(response).to.be.an('object');
      expect(response).to.include({'key': '1', 'value': 'One'});
    })

  })
});