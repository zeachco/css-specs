# css-specs
Report the differences from a snapshop versus a compiled / minified / huge css based on selector and rule specifications

### Features
- Create a snapshot from existing compiled style
- Compare compiled styles to last valid snapshot
- Report differences displaying actual and expected css values
- JSON format output (can be converted to XML for jenkins report and such)

### How to use
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
