
let canUseStorage = true
const canUseStorageKey = 'canUseStorageTest'
(function () {
  try {
    sessionStorage.setItem(canUseStorageKey, 'test')
    sessionStorage.getItem(canUseStorageKey)
    sessionStorage.removeItem(canUseStorageKey)
  } catch (e) {
    canUseStorage = false
  }
})()

export default canUseStorage
