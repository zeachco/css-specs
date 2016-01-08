# css-specs (CSSS)
Report the differences from a builded css file after modification. Based on selector and rule specifications that are being saved automatically from any given local html file or external urls.

### Features
- Create a snapshot from existing compiled style
- Compare compiled styles to last valid snapshot for that css build
- Report differences displaying actual and expected css values
- JSON format output (can be converted to XML for jenkins report and such)
- can be pointed to any html template (remote or local)
- can load any stylesheet file that is local to your computer
- load remote stylesheets if present in the template or the remote server

### How to use
add in you project

`npm install --save css-specs`

create a config file named `css-specs.conf.js`

```javascript
module.exports = {
  prettySnapshots: false,
  snapshotPath: 'snapshots',
  port: 5000
};
```

Now you may use it!

Refer to the [example](example/index.js) that you might run with `node index.js` from the example repository for advanced usage.

### API
We encourage reading the source code from [the entry point](index.js) and the [config defaults](config.js)
