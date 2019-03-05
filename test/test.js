/*!
 * Copyright (c) 2019 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

const bedrock = require('bedrock');
const mockData = require('./mocha/mock.data');
const uuid = require('uuid-random');
require('bedrock-stats');
require('bedrock-stats-storage-redis');

bedrock.events.on('bedrock-stats.report', async ({_createdDate, monitors}) => {

  // generate mock report data
  const fooMonitor = {stat1: uuid()};

  // add the mock report the aggregate report which will be stored
  monitors.fooMonitor = fooMonitor;

  // add a copy of the report to mock data for assertions
  mockData.reports.set1.push({
    createdDate: _createdDate,
    monitors: {fooMonitor},
  });
});

require('bedrock-test');
bedrock.start();
