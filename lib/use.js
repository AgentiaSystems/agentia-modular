'use strict';

var debug = require('debug')('modular:use');
var changeCase = require('agentia-change-case');
var utils = require('agentia-utilities');

var use = function use(plugin) {

  debug('using "%s" ...', plugin.name);
  plugin.id = changeCase.camelCase(plugin.name);
  plugin.modular = this;

  if (utils.isFunction(plugin.init)) {
    debug('initializing "%s" ...', plugin.name);
    plugin.init.call(plugin);
  }

  this.plugins[plugin.name] = plugin;

  this.registerInstance(plugin.id, plugin);
  this.registerInstance(plugin.name, plugin);

  this.emit(plugin.name + ':loaded', plugin);

  debug('loaded "%s" as "%s ..."', plugin.name, plugin.id);
  return this;
};

module.exports = use;
