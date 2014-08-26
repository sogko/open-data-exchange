'use strict';

/* jshint camelcase: false */
var config = require('../../../config');
var _ = require('lodash');
var async = require('async');
var arango = require('arangojs-extended');
var db = arango.Connection(config.arangoDb.url);

var COLLECTION_NAME = 'ckan_crawler';

function Crawled(obj) {
  if (!obj) { return; }
  this._id = obj._id;
  this._key = obj._key;
  this._rev = obj._rev;
  this.externalId = obj.external_id;
  this.rawData = obj.raw_data;
  this.sourceType = obj.source_type;
  this.sourceHost = obj.source_host;
  this.sourceUri = obj.source_uri;
}

Crawled.get = function (id, cb) {
  db.trackedDocument.get(COLLECTION_NAME + '/' + id, function (err, res) {
    var obj = res;
    if (!err) {
      obj = new Crawled(res);
    }
    cb(err, obj);
  });
};

/**
 * list is a static factory method that retrieves a list of Crawled document objects
 * @param opts
 * @param cb
 */
Crawled.list = function (opts, cb) {

  var options = _.assign({}, opts);

  var filters = options.filters;
  var query = options.arangoQuery;

  var data = _.merge({
    '@collectionName': COLLECTION_NAME
  }, filters.data);

  async.series([
    function countDocuments(next) {
      Crawled.count(function (err, res) {
        next(err, res);
      });
    },
    function executeQuery(next) {
      db.query.exec(query, data, function (err, res) {
        next(err, res);
      });
    }
  ], function (err, results) {
    if (err) {
      return cb(err, null);
    }

    var count = results[0].count || 0;
    var res = results[1];
    res.data = data;
    res.query = query;
    if (err && res.errorNum === 1501) {
      res.errorMessage = 'Invalid query';
    }
    var objs = (err) ? null : [];
    _.forEach(res.result, function (row) {
      var obj = new Crawled(row);
      if (objs && obj && obj._id) { objs.push(obj); }
    });
    cb(err, {
      crawled: objs,
      meta: {
        count: count,
        error: res.error,
        code: res.code,
        hasMore: res.hasMore,
        queryOptions: options
      }
    });
  });

};

Crawled.count = function (cb) {
  db.trackedCollection.count(COLLECTION_NAME, function (err, res) {
    cb(err, {
      count: res.count,
      meta: {
        error: res.error,
        code: res.code
      }
    });
  });
};

module.exports = Crawled;