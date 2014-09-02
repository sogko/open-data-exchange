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
  this._revisionKey = obj._revisionKey || 'latest';
  this.externalId = obj.externalId;
  this.sourceType = obj.sourceType;
  this.sourceHost = obj.sourceHost;
  this.sourceUri = obj.sourceUri;
  this.rawData = obj.rawData;
}

Crawled.get = function (id, cb) {
  async.parallel([
    function getDocument(next) {
      db.trackedDocument.get(COLLECTION_NAME + '/' + id, function (err, res) {
        next(err, res);
      });
    },
    function getLatestRevisionKey(next) {
      db.revision.latest(COLLECTION_NAME + '/' + id, function (err, res) {
        next(err, res);
      });
    }
  ], function (err, res) {
    var obj = res[0];
    if (!err) {
      obj = new Crawled(obj);
      obj._revisionKey = res[1].rev;
    }
    cb(null, obj);
  });

};

Crawled.getRevisions = function (id, opts, cb) {
  opts = _.assign({}, opts);

  db.revision.list(COLLECTION_NAME + '/' + id, opts, function (err, res) {
    var objs = (err) ? null : [];
    _.forEach(res.result, function (row) {
      if (objs && row) { objs.push(row); }
    });

    cb(err, {
      revisions: objs,
      meta: {
        count: -1,
        error: res.error,
        code: res.code,
        hasMore: res.hasMore,
        query: opts
      }
    });

  });
};
Crawled.getRevision = function (documentId, revisionKey, cb) {
  if (revisionKey === 'latest') {
    Crawled.get(documentId, cb);
  } else {
    db.revision.get(COLLECTION_NAME, revisionKey, function (err, res) {
      var obj = res;
      if (!err) {
        res._revisionKey = revisionKey;
        obj = new Crawled(res);
      }
      cb(err, obj);
    });
  }

};
/**
 * list is a static factory method that retrieves a list of Crawled document objects
 * @param opts
 * @param cb
 */
Crawled.list = function (opts, cb) {

  opts = _.assign({}, opts);

  var data = _.merge({
    '@collectionName': COLLECTION_NAME
  }, opts.filters.data);

  async.series([
    function executeQuery(next) {
      db.query.exec(opts.arangoQuery, data, function (err, res) {
        next(err, res);
      });
    },
    function countDocuments(next) {
      Crawled.count(function (err, res) {
        next(err, res);
      });
    }
  ], function (err, results) {
    if (err) {
      return cb(err, results[results.length - 1]);
    }

    var res = results[0];
    var count = results[1].count || 0;
    if (err && res.errorNum === 1501) {
      res.errorMessage = 'Invalid query';
    }
    var objs = (err) ? null : [];
    _.forEach(res.result, function (row) {
      var obj = new Crawled(row);
      if (objs && obj) { objs.push(obj); }
    });

    cb(err, {
      crawled: objs,
      meta: {
        count: count,
        error: res.error,
        code: res.code,
        hasMore: res.hasMore,
        query: opts
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