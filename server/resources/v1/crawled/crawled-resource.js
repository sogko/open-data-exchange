'use strict';

var express = require('express');
var resourceMapper = require('resource-mapper');
var Crawled = require('./crawled-model');
var ArangoGenericQueryFilter = require('./../../../middlewares/arango-generic-query-filter');

var router = express.Router();
var mapper = resourceMapper(router);

// set middleware for filtering queries
router.use('/crawled', new ArangoGenericQueryFilter('c'));

// map collection to RESTful APIs
var crawled = mapper.collection('crawled', {

  // GET /crawled
  list: function (req, res) {

    var opts = req.search;
    Crawled.list(opts, function (err, results) {
      res.json(results);
    });
  },

  // GET /crawled/:id
  show: function (req, res) {
    var id = req.param('id');
    Crawled.get(id, function (err, results) {
      res.json(results);
    });
  }

});

crawled.collection('revisions', {
  // GET /crawled/:id/revisions
  list: function (req, res) {
    var id = req.param('id');
    var opts = {};
    Crawled.getRevisions(id, opts, function (err, results) {
      res.json(results);
    });
  },

  // GET /crawled/:id/revisions/:revisionKey
  show: function (req, res) {
    var id = req.param('id');
    var revisionKey = req.param('revisionKey');
    Crawled.getRevision(id, revisionKey, function (err, results) {
      res.json(results);
    });
  }

}, {
  idParamName: ':revisionKey'
});
module.exports = router;
