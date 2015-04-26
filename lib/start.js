'use strict';

var debug = require('debug')('modular:start');
var utils = require('agentia-utilities');

var start = function start() {

  this.execPre('start', null, function() {
    this.emit('pre:start:done');
  });

  debug('checking plugins start ...');
  Object.keys(this.plugins).forEach(function(id) {
    var plugin = this.plugins[id];

    if (utils.isString(plugin.requires)) {
      plugin.requires = [plugin.requires];
    }

    // check requirements are loaded
    if (utils.isArray(plugin.requires)) {
      plugin.requires.forEach(function(requirement) {
        debug('plugin "%s" requires "%s"', plugin.name, requirement);
        if (!this.plugins[requirement]) {
          throw new Error('"' + plugin.name + '" requires missing "' + requirement + '"');
        }
      }, this);
    }

    debug('checking plugins start ... %s', plugin.name);
    if (utils.isFunction(plugin.start)) {
      debug('starting "%s" ...', plugin.name);
      this.inject(plugin.start, {}, plugin);
    }

  }, this);

  debug('checking plugins post:start ...');
  this.execPost('start', null, [], function() {
    this.emit('post:start:done');
  }.bind(this));

  return this;
};

module.exports = start;
