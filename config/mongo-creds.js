'use strict';

// Notes: Credentials should not be saved and checkin in the repo
// A manifest file should be created only during deployment as part of the CI workflow.
// Some PAAS also allows ENVIRONMENT savings
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
