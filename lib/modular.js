'use strict';

var EventEmitter = require('events').EventEmitter;
var inherits = require('util').inherits;
var Kareem = require('kareem');
var AssetManager = require('agentia-asset-manager');
var utils = require('agentia-utilities');

var callerId = require('caller-id');
var path = require('path');

var Modular = function Modular(modulesPath) {
  var caller = callerId.getData();
  var rootPath = path.dirname(caller.filePath);

  EventEmitter.call(this);
  this.setMaxListeners(0);

  this.paths = {
    root: rootPath,
    modules: utils.isString(modulesPath) ? modulesPath : null
  };

  this.plugins = {};
  this.container = new AssetManager();
  this.hooks = new Kareem();

  this.pre = this.hooks.pre.bind(this.hooks);
  this.post = this.hooks.post.bind(this.hooks);

  this.execPre = this.hooks.execPre.bind(this.hooks);
  this.execPost = this.hooks.execPost.bind(this.hooks);

  this.register = this.container.register.bind(this.container);
  this.registerFunction = this.container.registerFunction.bind(this.container);
  this.registerModule = this.container.registerModule.bind(this.container);
  this.registerInstance = this.container.registerInstance.bind(this.container);
  this.resolve = this.container.resolve.bind(this.container);
  this.inject = this.container.inject.bind(this.container);

  this.registerInstance('plugins', this.plugins);

  return this;
};

inherits(Modular, EventEmitter);

Modular.prototype.use = require('./use');
Modular.prototype.load = require('./load');
Modular.prototype.start = require('./start');

module.exports = Modular;
