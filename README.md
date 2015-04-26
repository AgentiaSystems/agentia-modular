![agentia-plugins logo](media/logo.png)
---
A generic plugin architecture for Node.js apps.

**UNDER CONSTRUCTION!**

#Installation

```js
npm install --save agentia-modular
```

#Configuration

```js
var Modular = require('Modular');
var modular = new Modular();
```

#API

## Application API

### .use()

```js
var plugin = require('plugin');
modular.use(plugin());
```

### .load()

```js
modular.load('npm-module-plugin');
modular.load('./path/to/module');
```

### .emit()
Emits an event.

```js
modular.emit('event-name', params);
```

### .start()
Initializes **agentia-modular** and calls the `.init()` method of all registered plugins.

```js
modular.start();
```

### .execPre()
Invokes all `.pre('hook-name')` hooks registered by modular.

```js
modular.execPre('hook-name', context, callback);
```

### .execPost()
Invokes all `.post('hook-name')` hooks registered by modular.

```js
modular.execPost('hook-name', context, callback);
```

### .registerFunction()
Used to register a `function` asset.

```js
container.registerFunction(id, fn[, injectable]);
```

### .registerModule()
Registers any Node.js requirable module as an asset. If it can be required using `require()` it can be registered using `.registerModule()`.

```js
container.registerModule([id,] module[, injectable]);
```

### .registerInstance()
Register any `string`, `number`, `date`, `array`, or `object` as an `instance` asset.

```js
container.registerInstance(id, instance);
```

### .inject()
Inejcts a function with dependencies and returns its value. F

```js
container.inject(ifn[, overrides][, context]);
```

### .resolve()
Resolve a registered asset. For dependency-injectable factories (functions and modules), it resolves all it's dependencies before calling the factory function, resolving to it's return value. All other assets are returned "as-is".

```js
container.resolve(id[, overrides][, context]);
```

## Plugin definition

```js
var Plugin = {
  name: 'my-plugin',

	// any other data exposed by the plugin
	key1: 'value1',
	key2: { subkey1: 'sub value1', subkey2: 'sub value2' },

  init: function() {
    // initialization code, called upon registration
		// this.modular is available during init() method
  },

	start: function(dependencyA, dependencyB) {
		// dependency injected start method, called on modular.start()
	},

	// any other methods exposed by the plugin
	methodA: function() {

	},

	methodB: function() {

	}

};

module.exports = Plugin;
```

## Plugin API

### .modular.pre()
Regsiters for a pre `hook-name` hook.

```js
this.modular.pre('hook-name', callback);
```

### .modular.post()
Registers for a post `hook-name` hook.

```js
this.post('hook-name', callback);
```

### .modular.on()
Registers a callback for event `event-name`.

```js
this.modular.on('event-name', callback);
```

# License
Agentia Modular is free and open source under the MIT License.

Copyright (c) 2015 [Johnny Estilles](https://github.com/JohnnyEstilles) and [Agentia Systems](http://www.agentia.asia)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
