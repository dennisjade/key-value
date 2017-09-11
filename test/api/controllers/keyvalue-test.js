var url = 'http://localhost:10010';
// var server = require('../../../app');
var expect = require('chai').expect;
var request = require('supertest')(url);
var nock = require('nock');


describe('controllers', function() {

  describe('keyvalue', function() {
    var key = '1';
    var value = 'Value 1';
    var timestamp = 1505137953723;

    describe('POST /object', function() {

      it('should return an object type of the document saved', function() {

        //define the method to be intercepted
        nock(url)
          .post('/object', {
            key: key,
            value: value
          })
          .reply(200, {
            key: key,
            value: value,
            timestamp: timestamp
          });

        request
          .post('/object')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function(err, res) {
            expect(err).to.be.null;
            expect(res).to.include({key, value: value, timestamp: timestamp});
          });
      });

    });

    describe('GET /object/key', function() {

      it('should return the latest value of the key', function() {

        //define the method to be intercepted
        nock(url)
          .get('/object/'+key)
          .reply(200, {
            value: value
          });

        request
          .post('/object/'+key)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function(err, res) {
            expect(err).to.be.null;
            expect(res).to.not.have.property('key');
            expect(res).to.include({value: value});
          });
      });

      it('should return the latest value of the key within the timestamp range', function() {

        //define the method to be intercepted
        nock(url)
          .get('/object/'+key)
          .query({
            timestamp: timestamp
          })
          .reply(200, {
            value: value
          });

        request
          .post('/object/'+key)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function(err, res) {
            expect(err).to.be.null;
            expect(res).to.not.have.property('key');
            expect(res).to.include({value: value});
          });
      });

    });

  });

});
