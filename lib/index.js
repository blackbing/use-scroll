/* eslint func-names: 0*/
/* eslint no-unused-expressions: 0*/

'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _domHelpersQueryScrollTop = require('dom-helpers/query/scrollTop');

var _domHelpersQueryScrollTop2 = _interopRequireDefault(_domHelpersQueryScrollTop);

var _domHelpersEventsOn = require('dom-helpers/events/on');

var _domHelpersEventsOn2 = _interopRequireDefault(_domHelpersEventsOn);

var _lodashThrottle = require('lodash.throttle');

var _lodashThrottle2 = _interopRequireDefault(_lodashThrottle);

var _exenv = require('exenv');

var prefix = '@@POS';
var scrollThreshold = 50;

function saveState(key, y) {
  sessionStorage.setItem('' + prefix + key, '' + y);
}
function getState(key) {
  return sessionStorage.getItem('' + prefix + key);
}
function createKey(loc) {
  var query = loc.query;
  var queryString = Object.keys(query).map(function (k) {
    return encodeURIComponent(k) + '=' + encodeURIComponent(query[k]);
  }).join('&');
  return loc.pathname + '?' + queryString;
}

function scrollToHash(loc) {
  //
  if (!loc.hash) {
    return false;
  }
  var hash = decodeURIComponent(loc.hash);
  var hashParts = hash.split('#');

  if (hashParts.length >= 2) {
    var _hash = hashParts[1];
    var element = document.querySelector('#' + _hash);
    if (element) {
      element.scrollIntoView();
      return true;
    }
  }
  return false;
}

function scrollToState(key) {
  var y = getState(key);
  if (!y) {
    return false;
  }
  // setTimeout 0 for avoid page rendering
  setTimeout(function () {
    window.scrollTo(0, y);
  }, 0);
  return true;
}

exports['default'] = function (history) {
  if (!_exenv.canUseDOM) {
    return history;
  }
  var currentKey = null;
  history.listen(function (loc) {
    currentKey = createKey(loc);
    // first try to check hash
    // second try to scrollTo State
    // finally scrollToTop
    !scrollToHash(loc) && !scrollToState(currentKey) && window.scrollTo(0, 0);
  });
  var onScroll = function onScroll() {
    var y = _domHelpersQueryScrollTop2['default'](window);
    saveState(currentKey, y);
  };

  _domHelpersEventsOn2['default'](window, 'scroll', _lodashThrottle2['default'](onScroll, scrollThreshold));
  return history;
};

module.exports = exports['default'];