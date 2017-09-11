'use strict';

var env = require('../package.json').enviroment || 'production';
var dbCreds = {
  'production': {
    dbname: 'vault-dragon',
    user: 'vault',
    pwd: 'vault1234',
    url: 'ds159953.mlab.com',
    port: '59953'
  },
  'developmnt': {
    dbname: 'vault-dragon',
    user: 'vault',
    pwd: 'vault1234!',
    url: 'ds159953.mlab.com',
    port: '59953'
  }
};

module.exports = dbCreds[env];
