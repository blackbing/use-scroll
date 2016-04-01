
let canUseStorage = true
const canUseStorageKey = 'canUseStorageTest'
(function () {
  try {
    sessionStorage.setItem(canUseStorageKey, 'test')
    sessionStorage.getItem(canUseStorageKey)
  } catch (e) {
    canUseStorage = false
  }
})()

export default canUseStorage
