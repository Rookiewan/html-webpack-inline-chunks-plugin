# htmlWebpackInlineChunksPlugin
a webpack plugin work with html-webpack-plugin，use it to insert script as inline to html file.
This is an extension plugin for the [webpack](http://webpack.github.io) plugin [html-webpack-plugin](https://github.com/ampedandwired/html-webpack-plugin).  It allows you to embed javascript and css source inline.

Installation
------------
You must be running webpack on node 0.12.x or higher

Install the plugin with npm:
```shell
$ npm install --save-dev html-webpack-inline-chunks-plugin
```

Basic Usage
-----------
Require the plugin in your webpack config:

```javascript
var HtmlWebpackInlineChunksPlugin = require('html-webpack-inline-chunks-plugin');
```

Add the plugin to your webpack config as follows:

```javascript
plugins: [
  new HtmlWebpackPlugin(),
  new HtmlWebpackInlineChunksPlugin()
]  
```
The above configuration will actually do nothing due to the configuration defaults.

When you set `inlineChunks` to chunks array will be embedded inline in the resulting html document.
```javascript
entry: {
  loading: './xxx/loading'
},
plugins: [
  new HtmlWebpackPlugin({
		inlineChunks: ['loading']
	}),
  new HtmlWebpackInlineChunksPlugin()
]  
```
if you have many pages and want to set the same chunk, do like this
```javascript
entry: {
  layer: './xxx/layer'
  loading: './xxx/loading'
},
plugins: [
  new HtmlWebpackPlugin({
		inlineChunks: []
	}),
  new HtmlWebpackPlugin({
		inlineChunks: ['layer']
	}),
  new HtmlWebpackInlineChunksPlugin({
    chunks: ['loading']
  })
]  
```
