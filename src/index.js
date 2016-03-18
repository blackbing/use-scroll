/* eslint func-names: 0*/
/* eslint no-unused-expressions: 0*/

import scrollTop from 'dom-helpers/query/scrollTop';
import on from 'dom-helpers/events/on';
import throttle from 'lodash.throttle';
import { canUseDOM } from 'exenv';

const prefix = '@@POS';
const scrollThreshold = 50;

function saveState(key, y) {
  sessionStorage.setItem(`${prefix}${key}`, `${y}`);
}
function getState(key) {
  return sessionStorage.getItem(`${prefix}${key}`);
}
function createKey(loc) {
  const query = loc.query;
  const queryString = Object.keys(query).map(k => `${encodeURIComponent(k)}=${encodeURIComponent(query[k])}`).join('&');
  return `${loc.pathname}?${queryString}`;
}

function scrollToHash(loc) {
  //
  if (!loc.hash) {
    return false;
  }
  const hash = decodeURIComponent(loc.hash);
  const hashParts = hash.split('#');

  if (hashParts.length >= 2) {
    const _hash = hashParts[1];
    const element = document.querySelector(`#${_hash}`);
    if (element) {
      element.scrollIntoView();
      return true;
    }
  }
  return false;
}

function scrollToState(key) {
  const y = getState(key);
  if (!y) {
    return false;
  }
  // setTimeout 0 for avoid page rendering
  setTimeout( () => {
    window.scrollTo(0, y);
  }, 0);
  return true;
}

export default function(history) {
  if (!canUseDOM) {
    return history;
  }
  let currentKey = null;
  history.listen( function(loc) {
    currentKey = createKey(loc);
    // first try to check hash
    // second try to scrollTo State
    // finally scrollToTop
    !scrollToHash(loc) && !scrollToState(currentKey) && window.scrollTo(0, 0);
  });
  const onScroll = () => {
    const y = scrollTop(window);
    saveState(currentKey, y);
  };

  on(window, 'scroll', throttle(onScroll, scrollThreshold));
  return history;
}
