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
mapper.collection('crawled', {

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

module.exports = router;
