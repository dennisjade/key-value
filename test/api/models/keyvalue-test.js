'use strict';

var sinon = require('sinon');
var rewire = require('rewire');
var expect = require('chai').expect;
var keyvalue = rewire('../../../api/models/keyvalue');

describe('unit - models - keyvalue', function(){

  describe('save model', function() {
    var key = '1';
    var value = 'Value 1';

    it('should return an error from a db transaction when trying to insert document', function () {
      return keyvalue.__with__({
        KeyValue: {
          collection: {
            insert: sinon.stub().rejects('Error from db')
          }
        }
      })(function () {
        return keyvalue.save(key, value)
          .then(function () {
            expect(false).to.be.true;
          })
          .catch(function(err){
            expect(err).to.not.be.an('undefined');
            expect(err).to.have.property('message');
          })
      })

    });

    it('should return the data inserted to db', function () {
      return keyvalue.__with__({
        KeyValue: {
          collection: {
            insert: sinon.stub().resolves({
              key: key,
              value: value
            })
          }
        }
      })(function () {
        return keyvalue.save(key, value)
          .then(function (data) {
            expect(data).to.be.an('object');
            expect(data).to.have.property('key', key);
            expect(data).to.have.property('value', value);
          })
          .catch(function(err){
            expect(true).to.be.false;
          })
      })
    })

  });

  describe('findKey model', function() {
    var key = '1';
    var value = 'Value 1';
    var timestamp = 1505137953723;

    it('should return an error from a db transactions when trying to find a document', function() {
      var sort = sinon.stub().rejects('Error findKey');
      return keyvalue.__with__({
        KeyValue: {
          findOne: function (query) {
            return this;
          },
          sort: sort
        }
      })(function () {
        return keyvalue.findKey(key)
          .then(function(){
            expect(true).to.be.false;
          })
          .catch(function (err){
            expect(err).to.not.be.an('undefined');
            expect(err).to.have.property('message');
          })
      })
    });

    it('should return the latest value stored in the db', function () {
      var sort = sinon.stub().resolves({
        _doc: {
          _id: 123,
          key: key,
          value: value,
          timestamp: timestamp
        }
      });
      return keyvalue.__with__({
        KeyValue: {
          findOne: function(query){
            return this;
          },
          sort: sort
        }
      })(function () {
        return keyvalue.findKey(key, timestamp)
          .then(function (data) {
            expect(data).to.be.an('object');
            expect(data).to.include({key, value: value, timestamp: timestamp});
          })
          .catch(function (err) {
            expect(true).to.be.false;
          })
      })
    })
  })

});