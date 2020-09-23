#!/usr/bin/env node
// vi: ft=javascript

const nconf = require('nconf');
const bunyan = require('bunyan');
const bunyanFormat = require('bunyan-format');

const importData = require('./import')

nconf.env({
  separator: '_'
}).argv();
nconf.defaults(require('./defaults'));

const logger = bunyan.createLogger({
  name: nconf.get('appname'),
  level: nconf.get('log:level'),
  stream: bunyanFormat({
    outputMode: nconf.get('log:format')
  })
});

const conf = {
  logger: logger,
  cb: {
    bucketName: nconf.get('cb:bucketName'),
    connectionString: nconf.get('cb:connectionString')
  }
}

const startTimestamp = new Date().getTime()
importData(conf, (w) => {
  const duration = (new Date().getTime() - startTimestamp) / 1000
  console.log(`done in ${duration} seconds`)
  process.exit(0)
})
