/*!
 * Copyright (c) 2019 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

const {config} = require('bedrock');

const cfg = config['stats'] = {};

cfg.report = {};
// generate reports at this interval in ms
cfg.report.interval = 60 * 1000;

// reports will be sent to all of the configured storage modules
// TODO: future implement `moduleFilter` and other filters
// `name` === 'bedrock-logger' sends reports to the bedrock logger
// otherwise `name` corresponds to bedrock-stats-storage-<name>
cfg.storage = [
  // {name: 'redis'},
  // {name: 'bedrock-logger', storageOptions: {level: 'debug'}},
  // future possibility - store using this module once every 4 hours
  // {name: 'future', moduleFilter: {a: {interval: 4 * 60 * 60 * 1000}}}
];
