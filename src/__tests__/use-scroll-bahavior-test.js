import expect from 'expect'
import canUseStorage from '../util/canUseStorage'
import {
  createKey,
  getState,
  saveState,
  scrollToHash,
  scrollToState
} from '../util/scroll'


describe('use-scroll-bahavior', () => {
  beforeEach(() => {
  })

  afterEach(() => {
  })
  it('canUseStorage have to be bool', () => {
    expect(canUseStorage).toBe(true)
  })
  it('should be defined', () => {
    expect(createKey).toExist()
    expect(saveState).toExist()
    expect(scrollToHash).toExist()
    expect(scrollToState).toExist()
  })
  it('should saveState and getState', () => {
    const key = 'test'
    const val = '100'
    saveState(key, val)
    expect(getState(key)).toBe(val)
  })
  it('should createKey', () => {
    const loc = {
      pathname: '/news/1234567',
      query: {
        a: 'a',
        b: 'b'
      }
    }
    expect(createKey(loc)).toBe('/news/1234567?a=a&b=b')
  })
  it('should createKey from createBrowserHistory()', () => {
    const loc = {
      pathname: '/news/1234567',
      search: '?a=a&b=b'
    }
    expect(createKey(loc)).toBe('/news/1234567?a=a&b=b')
  })
  it('should createKey with config excludePath', () => {
    const loc = {
      pathname: '/news/1234567',
      query: {
        a: 'a',
        b: 'b'
      }
    }
    const config = {
      excludePath: /news\//
    }
    expect(createKey(loc, config)).toBe(null)
  })
  it('should createKey with config excludePath(array)', () => {
    const loc = {
      pathname: '/news/1234567',
      query: {
        a: 'a',
        b: 'b'
      }
    }
    const config = {
      excludePath: [ /news\// ]
    }
    expect(createKey(loc, config)).toBe(null)
  })
})
