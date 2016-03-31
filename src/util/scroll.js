import isArray from 'lodash.isarray'
import canUseStorage from './canUseStorage'

const prefix = '@@POS'

export function saveState(key, y) {
  if (canUseStorage) {
    sessionStorage.setItem(`${prefix}${key}`, `${y}`)
  }
}
export function getState(key) {
  if (!canUseStorage) {
    return null
  } else {
    return sessionStorage.getItem(`${prefix}${key}`)
  }
}
export function createKey(loc, config={}) {
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
      })
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

export function scrollToHash(loc) {
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

export function scrollToState(key) {
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

