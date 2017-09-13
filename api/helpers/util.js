'use strict';

module.exports = {
  formatKeyValue: formatKeyValue
};

/**
 * Returns a key value-pair format
 * @param data
 * @returns {null}
 */
function formatKeyValue (data) {
  // return immediately to avoid more processing
  if (typeof data !== 'object') {
    return {
      error: 'Not a JSON object'
    };
  }

  var key = Object.keys(data);

  // validate in case the data sent has more key-value pair like {key:value, key, value}
  // requirements only need to send one
  if (key.length !== 1){
    return {
      error: 'Data did not conform to the format given'
    };
  }

  return {
    key: key[0],
    value: data[key[0]]
  }

}