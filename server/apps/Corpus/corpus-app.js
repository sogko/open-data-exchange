'use strict';

var path = require('path');
var express = require('express');

module.exports = function (parent) {

  var app = express();

  var router = require('./corpus-routes');

  // set views directory for current app
  app.set('views', path.join(__dirname  + '/views'));

  // set routing settings (inherit from parent)
  app.set('case sensitive routing', parent.get('case sensitive routing'));
  app.set('strict routing', parent.get('strict routing'));

  // handle non-trailing-slash routes
  app.all('/Corpus', function (req, res) {
    res.redirect('/Corpus/');
  });

  //mount router
  app.use('/Corpus/', router);

  return app;
};

