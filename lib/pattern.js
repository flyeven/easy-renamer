'use strict';

var lazy = require('lazy-cache')(require);
var parsePath = lazy('parse-filepath');
var mm = lazy('micromatch');

function Pattern(pattern, opts, fn) {
  opts = opts || {};
  this.pattern = pattern;
  this.isMatch = function (fp) {
    return mm().isMatch(fp, pattern, {contains: true});
  };

  this.rename = function (fp) {
    var parsed = parsePath()(fp);
    parsed.options = opts;
    return fn.call(this, parsed);
  };
}

/**
 * Expose `Pattern`
 */

module.exports = Pattern;
