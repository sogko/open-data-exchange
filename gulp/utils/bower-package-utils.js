'use strict';
var _ = require('lodash');
var resolve = require('bower-resolve');

function getBowerPackageIds() {
  // read bower.json and get dependencies' package ids
  var bowerManifest = {};
  try {
    bowerManifest = require(process.cwd() + '/bower.json');
  } catch (e) {
    // does not have a bower.json manifest
  }
  console.log('_.keys(bowerManifest.dependencies)', _.keys(bowerManifest.dependencies));
  return _.keys(bowerManifest.dependencies) || [];

}

module.exports = {
  packageIds: getBowerPackageIds,
  resolve: resolve.fastReadSync
};
