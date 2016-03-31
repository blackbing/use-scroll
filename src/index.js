/* eslint func-names: 0*/
/* eslint no-unused-expressions: 0*/

import scrollTop from 'dom-helpers/query/scrollTop'
import on from 'dom-helpers/events/on'
import throttle from 'lodash.throttle'
import { canUseDOM } from 'exenv'
import {
  createKey,
  saveState,
  scrollToHash,
  scrollToState
} from './util/scroll'
import canUseStorage from './util/canUseStorage'

const scrollThreshold = 150

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
    if (canUseStorage) {
      const y = scrollTop(window)
      if (y && currentKey) {
        saveState(currentKey, y)
      }
    }
  }

  on(window, 'scroll', throttle(onScroll, scrollThreshold))
  return history
}
