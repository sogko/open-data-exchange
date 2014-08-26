'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var config = require('./config');
var logger = require('./lib/logger');
var _ = require('lodash');
var path = require('path');
var glob = require('globby');
var http = require('http');
var express = require('express');
var handlebars = require('express-handlebars');
var busboy = require('connect-busboy');
var parseQueryJSON = require('./middlewares/parse-query-json');

// require main expressjs and export apps
var app = module.exports = express();
var server = http.createServer(app);

// set logger
app.set('logger', logger);

// set default template engine to handlebars
app.engine('hbs', handlebars(config.handlebars));
app.set('view engine', config.defaultViewEngine);
app.set('views', config.dirs.views);

// set routing settings
app.set('case sensitive routing', config.router.caseSensitive);
app.set('strict routing', config.router.strict);

// parse query string as json
app.use(parseQueryJSON());

// streaming parser for HTML form data
app.use(busboy());

// load and mount all apps
glob([
  path.join(config.dirs.apps, '/**/*-app.js')
], {}, function (er, files) {
  _.forEach(files, function (f) {
    // load
    var _app = require(f)(app);
    // mount
    if (_app && _app !== app) { app.use(_app); }
  });
});

// load and mount all resources
// resources returns express.Routers
glob([
  path.join(config.dirs.resources, '/**/*-resource.js')
], {}, function (er, files) {
  _.forEach(files, function (f) {
    // load
    var _resourceRouter = require(f);
    var resourceMajorVersion;
    try {
      resourceMajorVersion = f.split(config.dirs.resources + '/')[1].split('/')[0];
    } catch (e) {
      throw new Error('Invalid resource version. Please consult documentation.');
    }
    // mount
    var mountPath = '/api/' + resourceMajorVersion;
    if (_resourceRouter) { app.use(mountPath, _resourceRouter); }
  });
});

// setup public static directory
app.use('/static', express.static(config.dirs.static));

// start HTTP server
server.listen(config.port, config.hostname);
server.on('listening', function () {
  logger.info('Server started on port %s at %s', server.address().port, server.address().address);
});