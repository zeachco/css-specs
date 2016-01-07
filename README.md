# css-specs
Report the differences from a snapshop versus a compiled / minified / huge css based on selector and rule specifications

### Features
- Create a snapshot from existing compiled style
- Compare compiled styles to last valid snapshot
- Report differences displaying actual and expected css values
- JSON format output (can be converted to XML for jenkins report and such)

### How to use

#### from node
If you require it from node and call `.manual()` it will wait 
See [example file](example/index.js)

#### from NPM

add in you project

`npm install --save css-specs`

create a config file named `css-specs.conf.js`

```javascript
module.exports = {
  serverPort: 5000,
  specsPath: 'path/to/specs.js',
  snapshotPath: 'path/to/dir/for/snapshots/',
  buildPath: 'path/to/build.min.css',
  template: 'path/to/template.html'
};
```

add to npm package
```json
{
  "name": "example",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "css-specs"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "css-specs": ">0"
  }
}
```

then you may run `npm test` to execute the lib with the configuration file.
