/*!
 * Copyright (c) 2019 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

const brStatsStorageRedis = require('bedrock-stats-storage-redis');
const mockData = require('./mock.data');

describe('Stats', () => {
  it('stores five seconds of monitor reports using redis storage', async () => {
    await sleep(5000);
    const result = await brStatsStorageRedis.find({monitorIds: ['fooMonitor']});
    result.should.eql(mockData.reports.set1);
  });
});

async function sleep(delay) {
  return new Promise(resolve => setTimeout(resolve, delay));
}
