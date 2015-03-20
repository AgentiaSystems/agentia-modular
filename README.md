![agentia-plugins logo](media/logo.png)
---
A generic plugin architecture for Node.js apps.

**UNDER CONSTRUCTION!**

#Installation

```js
npm install --save agentia-plugins
```

#Configuration

```js
var plugins = new Plugins();
```

#API

## Application API

### .init()
Calls the `.init()` method of all registered plugins.

```js
plugins.init();
```

### .execPre()
Invokes all `.pre('hook-name')` registered by plugins.

```js
plugins.execPre('hook-name', context, callback);
```

### .execPost()
Invokes all `.post('hook-name')` registered by plugins.

```js
plugins.execPost('hook-name', context, callback);
```

### .addDependency()
Expose an object for dependency injection.

```js
plugins.expose('dependency-name', object);
```

### .removeDependency()
Removes a previously added dependency.

```js
plugins.expose('dependency-name');
```

### .emit()
Emit an event. 

```js
plugins.emit('event-name', params);
```

## Plugin API

### Plugin Registration
var BasePlugin = require('agentia-plugins').BasePlugin;
var utils = require('agentia-plugins').utils;

```js
function Plugin(options) {
	if (!(this instanceof PlugIn)) {
		return new Plugin(options);
	}
	// must be a unique name
	this.name = 'plugin-name';
	
	// for plugin internal use
	this.options = options;
	
	// app features to implement or replace
	this.features = {
		featureA: this.featureA,
		featureB: this.featureB 
	};
	
	returns this;
	
};

utils.inherits(BasePlugin, Plugin);

// required;
Plugin.prototype.init = function init(deps) {
	...
};

Plugin.prototype.featureA = function featureA(deps) {
	...
};

Plugin.prototype.featureB = function featureA(deps) {
	...
};

module.exports = Plugin;
```
> NOTE: Plugins get automatically added as dependencies (see `.addDendency()` above). So they can by injected into other plugins as required.

### .pre()
Regsiter for a pre `hook-name` hook.

```js
plugins.pre('hook-name', callback);
```

### .post()
Register for a post `hook-name` hook.

```js
plugins.post('hook-name', callback);
```

### .on()
Register a callback for event `event-name`.

```js
plugins.on('event-name', callback);
```


## Plugin Consumer API

### .use()

```js
var plugin = require('plugin');
plugins.use(plugin(options));
```

# License
Agentia Ping Handler is free and open source under the MIT License.

Copyright (c) 2015 [Johnny Estilles](https://github.com/JohnnyEstilles) and [Agentia Systems](http://www.agentia.asia)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

