'use strict';

var _ = require('lodash');
var cuid = require('cuid');
var S = require('string');
var flatten = require('flat').flatten;

module.exports = function (qualifier) {
  return function (req, res, next) {

    var filtersRaw = flatten(req.query.filters || {});
    var fieldsRaw = req.param('fields') || '';
    var skip = req.param('skip') || 0;
    var limit = req.param('limit') || 20;
    var sortRaw = req.param('sort') || '';

    // parse filter query
    var filterData = {};
    var filterQuery = [];
    _.forEach(filtersRaw, function (val, key) {
      var bindParamName = cuid();
      filterData[bindParamName] = val;
      filterQuery.push([qualifier, '.', key, ' == ', '@', bindParamName].join(''));
    });

    // parse fields query
    var fields = [];
    fieldsRaw = fieldsRaw.replace(/[,:]/g, ';').split(';');
    _.forEach(fieldsRaw, function (f) {
      if (!f || f.split(' ').length !== 1) {
        return;
      }
      fields.push([f, ':', qualifier, '.', f].join(''));
    });

    // parse sort query
    sortRaw = sortRaw.split(',');
    var sort = [];
    _.forEach(sortRaw, function (val) {
      if (!val) {
        return;
      }
      val = S(val);
      sort.push([qualifier, '.', val.chompLeft('-').s, ' ', (val.startsWith('-')) ? 'DESC' : 'ASC'].join(''));
    });

    // build query string
    // TODO: refactor this out
    var query = [
      'FOR', qualifier, 'in @@collectionName',
      (filterQuery.length) ? ['FILTER ', filterQuery.join(' && ')].join('') : '',
      (sort.length) ? ['SORT ', sort.join(', ')].join('') : '',
      'LIMIT', [skip, ',', limit].join(''),
      'RETURN ', (fields.length) ? ['{', fields.join(','), '}'].join('') : qualifier
    ].join(' ');

    req.search = {
      qualifier: qualifier,
      filters: {
        query: filterQuery,
        data: filterData
      },
      fields: fields,
      sort: sort,
      skip: skip,
      limit: limit,
      arangoQuery: query
    };
    next();
  };
};