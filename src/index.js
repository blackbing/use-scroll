/* eslint func-names: 0*/
/* eslint no-unused-expressions: 0*/

import scrollTop from 'dom-helpers/query/scrollTop'
import on from 'dom-helpers/events/on'
import throttle from 'lodash.throttle'
import isArray from 'lodash.isarray'
import { canUseDOM } from 'exenv'

const prefix = '@@POS'
const scrollThreshold = 150

let STORAGE_FAIL = false
function saveState(key, y) {
  try {
    sessionStorage.setItem(`${prefix}${key}`, `${y}`)
  } catch (e) {
    STORAGE_FAIL = true
  }
}
function getState(key) {
  if (STORAGE_FAIL) {
    return null
  } else {
    return sessionStorage.getItem(`${prefix}${key}`)
  }
}
function createKey(loc, config) {
  let queryString = ''
  if (config.excludePath) {
    const excludePath = config.excludePath
    let excluded = false
    if (isArray(excludePath)) {
      excludePath.forEach( (pathReg) => {
        if (pathReg.test(loc.pathname)) {
          excluded = true
          return false
        }
      });
    } else {
      if (excludePath.test(loc.pathname)) {
        excluded = true
      }
    }
    if (excluded) {
      return null
    }
  }
  if (loc.query && typeof loc.query === 'object') {
    const query = loc.query
    queryString = '?' + Object.keys(query).map(k => `${encodeURIComponent(k)}=${encodeURIComponent(query[k])}`).join('&')
  } else if (loc.search) {
    queryString = loc.search
  }

  return `${loc.pathname}${queryString}`
}

function scrollToHash(loc) {
  //
  if (!loc.hash) {
    return false
  }
  const hash = decodeURIComponent(loc.hash)
  const hashParts = hash.split('#')

  if (hashParts.length >= 2) {
    const _hash = hashParts[1]
    const element = document.querySelector(`#${_hash}`)
    if (element) {
      element.scrollIntoView()
      return true
    }
  }
  return false
}

function scrollToState(key) {
  const y = getState(key)
  if (!y) {
    return false
  }
  // setTimeout 0 for avoid page rendering
  setTimeout( () => {
    window.scrollTo(0, y)
  }, 0)
  return true
}

export default function (history, config={}) {
  if (!canUseDOM) {
    return history
  }
  let currentKey = null
  history.listen( function (loc) {
    currentKey = createKey(loc, config)
    // first try to check hash
    // second try to scrollTo State
    // finally scrollToTop
    !scrollToHash(loc) && !scrollToState(currentKey) && window.scrollTo(0, 0)
  })
  const onScroll = () => {
    if (!STORAGE_FAIL) {
      const y = scrollTop(window)
      if (y && currentKey) {
        saveState(currentKey, y)
      }
    }
  }

  on(window, 'scroll', throttle(onScroll, scrollThreshold))
  return history
}
