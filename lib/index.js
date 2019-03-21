/*!
 * Copyright (c) 2019 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

const assert = require('assert-plus');
const brPackageManager = require('bedrock-package-manager');
const {util: {BedrockError}} = require('bedrock');
require('./scheduled-job');
require('./config');

/**
 * @module bedrock-stats
 */

/**
 * Get all known monitor IDs.
 *
 * @param {Object} options - The options to use.
 * @param {string} options.storageApi - The storage API to use.
 *
 * @returns {Promise<string[]>} The monitor IDs.
 * @throws {BedrockError} Will throw a `NotFoundError` on an unknown storage
 *   API.
 */
exports.getMonitorIds = async ({storageApi}) => {
  const storage = _requireStorage(storageApi);
  return storage.getMonitorIds();
};

/**
 * Get a stats reports matching the query.
 *
 * @param {Object} options - The options to use.
 * @param {Object} options.query - The query passed to the storage API.
 * @param {string} options.storageApi - The storage API to use.
 *
 * @returns {Promise<Object>} The stats report.
 * @throws {BedrockError} Will throw a `NotFoundError` on an unknown storage
 *   API.
 */
exports.getReports = async ({query = {}, storageApi}) => {
  const storage = _requireStorage(storageApi);
  return storage.find(query);
};

function _requireStorage(storageApi) {
  assert.string(storageApi, 'options.storageApi');
  const {packageName} = brPackageManager.get(
    {alias: storageApi, type: 'bedrock-stats-store'});
  let storage;
  try {
    storage = require(packageName);
  } catch(e) {
    throw new BedrockError(
      'Unable to load the storage module.', 'NotFoundError', {
        packageName,
        storageApi,
        public: false,
      }, e);
  }
  return storage;
}
