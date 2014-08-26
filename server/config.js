/**
 * [Leaner.core.server.config] ExpressJS server configuration settings
 */

'use strict';

module.exports = {
  hostname: 'localhost',
  port: 3000,
  dirs: {
    static: __dirname + '/../client/dist',
    views: __dirname + '/views',
    routes: __dirname + '/routes',
    apps: __dirname + '/apps',
    resources: __dirname + '/resources'
  },
  router: {
    caseSensitive: true,
    strict: true
  },
  defaultViewEngine: 'hbs',
  handlebars: {
    extname: 'hbs',
    defaultLayout: 'main.hbs',
    layoutsDir: __dirname + '/core/view-engines/handlebars/views/layouts/',
    partialsDir: __dirname + '/core/view-engines/handlebars/views/partials/'
  },
  arangoDb: {
    url: 'http://localhost:8529'
  }
};