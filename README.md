# bedrock-stats

## Available Storage APIs
- [bedrock-stats-storage-redis](https://github.com/digitalbazaar/bedrock-stats-storage-redis)

## API Reference
<a name="module_bedrock-stats"></a>

## bedrock-stats

* [bedrock-stats](#module_bedrock-stats)
    * [.getMonitorIds(options)](#module_bedrock-stats.getMonitorIds) ⇒ <code>Promise.&lt;Array.&lt;string&gt;&gt;</code>
    * [.getReports(options)](#module_bedrock-stats.getReports) ⇒ <code>Promise.&lt;Object&gt;</code>

<a name="module_bedrock-stats.getMonitorIds"></a>

### bedrock-stats.getMonitorIds(options) ⇒ <code>Promise.&lt;Array.&lt;string&gt;&gt;</code>
Get all known monitor IDs.

**Kind**: static method of [<code>bedrock-stats</code>](#module_bedrock-stats)  
**Returns**: <code>Promise.&lt;Array.&lt;string&gt;&gt;</code> - The monitor IDs.  
**Throws**:

- <code>BedrockError</code> Will throw a `NotFoundError` on an unknown storage
  API.


| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> | The options to use. |
| options.storageApi | <code>string</code> | The storage API to use. |

<a name="module_bedrock-stats.getReports"></a>

### bedrock-stats.getReports(options) ⇒ <code>Promise.&lt;Object&gt;</code>
Get a stats reports matching the query.

**Kind**: static method of [<code>bedrock-stats</code>](#module_bedrock-stats)  
**Returns**: <code>Promise.&lt;Object&gt;</code> - The stats report.  
**Throws**:

- <code>BedrockError</code> Will throw a `NotFoundError` on an unknown storage
  API.


| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> | The options to use. |
| options.query | <code>Object</code> | The query passed to the storage API. |
| options.storageApi | <code>string</code> | The storage API to use. |

