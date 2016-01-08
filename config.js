var config = require(process.cwd() + '/css-specs.conf');

config.prettySnapshots = config.prettySnapshots || false;

module.exports = defaultVals(config, {
  prettySnapshots: true,
  snapshotPath: 'snapshots',
  port: 5000
});

function defaultVals(conf, defs) {
  for (key in defs) {
    if (!conf[key])
      conf[key] = defs[key];
  }
  return conf;
}
