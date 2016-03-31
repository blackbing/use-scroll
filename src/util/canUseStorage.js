

let canUseStorage = true;

(function () {
  try {
    sessionStorage.getItem('test')
  } catch (e) {
    canUseStorage = false
  }
})()

export default canUseStorage
