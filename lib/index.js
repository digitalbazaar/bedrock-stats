/*!
 * Copyright (c) 2019 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

const assert = require('assert-plus');
const {util: {BedrockError}} = require('bedrock');
require('./scheduled-job');
require('./config');

exports.getMonitorIds = async ({storageApi}) => {
  const storage = _requireStorage(storageApi);
  return storage.getMonitorIds();
};

exports.getReports = async ({query = {}, storageApi}) => {
  const storage = _requireStorage(storageApi);
  return storage.find(query);
};

function _requireStorage(storageApi) {
  assert.string(storageApi, 'options.storageApi');
  const storageModule = `bedrock-stats-storage-${storageApi}`;
  let storage;
  try {
    storage = require(storageModule);
  } catch(e) {
    throw new BedrockError(
      'Unable to load the storage module.', 'NotFoundError', {
        storageApi,
        storageModule,
        public: false,
      }, e);
  }
  return storage;
}
