/*!
 * Copyright (c) 2019 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

const brStats = require('bedrock-stats');
const mockData = require('./mock.data');
const {AssertionError} = require('assert');

describe('Stats', () => {
  describe('getReports API', () => {
    it('throws AssertionError on missing `storageApi` param', async () => {
      let error;
      let result;
      try {
        result = await brStats.getReports({});
      } catch(e) {
        error = e;
      }
      should.not.exist(result);
      should.exist(error);
      (error instanceof AssertionError).should.be.true;
    });
    it('throws NotFoundError on an unknown storage API', async () => {
      let error;
      let result;
      try {
        result = await brStats.getReports({storageApi: 'unknown'});
      } catch(e) {
        error = e;
      }
      should.not.exist(result);
      should.exist(error);
      error.name.should.equal('NotFoundError');
    });
    it('returns a result', async () => {
      // allow the mock monitor to generate some reports
      await sleep(500);
      let error;
      let result;
      try {
        result = await brStats.getReports({
          query: {monitorIds: ['fooMonitor']},
          storageApi: 'redis'
        });
      } catch(e) {
        error = e;
      }
      assertNoError(error);
      should.exist(result);
      result.should.be.an('array');
    });
  }); // end getReports API

  describe('getMonitorIDs API', () => {
    it('throws AssertionError on missing `storageApi` param', async () => {
      let error;
      let result;
      try {
        result = await brStats.getMonitorIds({});
      } catch(e) {
        error = e;
      }
      should.not.exist(result);
      should.exist(error);
      (error instanceof AssertionError).should.be.true;
    });
    it('throws NotFoundError on an unknown storage API', async () => {
      let error;
      let result;
      try {
        result = await brStats.getMonitorIds({storageApi: 'unknown'});
      } catch(e) {
        error = e;
      }
      should.not.exist(result);
      should.exist(error);
      error.name.should.equal('NotFoundError');
    });
    it('returns a result', async () => {
      // allow the mock monitor to generate some reports
      await sleep(500);
      let error;
      let result;
      try {
        result = await brStats.getMonitorIds({storageApi: 'redis'});
      } catch(e) {
        error = e;
      }
      assertNoError(error);
      should.exist(result);
      result.should.be.an('array');
      result.should.have.length(1);
      result.should.have.same.members(['fooMonitor']);
    });
  }); // end getMonitorIDs API

  describe('Scheduled Job', () => {
    it('stores monitor reports using redis storage', async () => {
      await sleep(5000);
      const result = await brStats.getReports({
        query: {monitorIds: ['fooMonitor']},
        storageApi: 'redis',
      });
      result.should.eql(mockData.reports.set1);
    });
  });
});

async function sleep(delay) {
  return new Promise(resolve => setTimeout(resolve, delay));
}
