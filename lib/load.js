'use strict';

var debug = require('debug')('modular:load');

var callerId = require('caller-id');
var path = require('path');

var load = function load(id) {
  var caller = callerId.getData(load);
  var dirname = path.dirname(caller.filePath);
  var modulePath = id;

  // if relative path, normalize with called path
  if (id.charAt(0) === '.') {
    modulePath = path.join(dirname, id);
  }

  debug('loading: %s ...', id);
  this.use(require(modulePath));

  return this;
};

module.exports = load;
