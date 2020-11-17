/*!
 * Copyright (c) 2019 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

const _constants = require('./constants');
const bedrock = require('bedrock');
const brJobs = require('bedrock-jobs');
const {config, util: {BedrockError}} = bedrock;
const logger = require('./logger');

require('./config');
const cfg = config.stats;

bedrock.events.on('bedrock.start', async () => {
  const jobQueue = exports.jobQueue = await brJobs.addQueue(
    {name: _constants.JOB_QUEUE});

  if(cfg.worker.enable) {
    // setup a processor for the queue with the default concurrency of 1
    jobQueue.process(generateReport);
  }

  await jobQueue.add({}, {
    // prevent duplicate jobs by specifying a non-unique jobId
    jobId: 'generateReport',
    // repeated jobs are completed and rescheduled on every iteration
    repeat: {every: cfg.report.interval},
    // do not keep record of successfully completed jobs in redis
    removeOnComplete: true
  });
});

async function generateReport() {
  const _createdDate = Date.now();
  const monitors = {};

  // pass the _createdDate timestamp into the monitor handlers
  await bedrock.events.emit('bedrock-stats.report', {_createdDate, monitors});

  const report = {createdDate: _createdDate, monitors};
  for(const {name, storageOptions = {}} of cfg.storage) {
    if(name === 'bedrock-logger') {
      const level = storageOptions.level || 'debug';
      return logger[level]('Report', {report});
    }
    try {
      const s = require(`bedrock-stats-storage-${name}`);
      await s.insert({report, storageOptions});
    } catch(e) {
      logger.error(new BedrockError(
        'An error occurred during report storage.', 'OperationError',
        {name, storageOptions}, e));
    }
  }
  await bedrock.events.emit('bedrock-stats.report-complete', {_createdDate});
}
