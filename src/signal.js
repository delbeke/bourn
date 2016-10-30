const OBSERVERS = Symbol()
const ID = Symbol()
let signalId = 0

module.exports = class Signal {
  constructor (container) {
    if (typeof container === 'object') {
      container.push(this)
    }
    this[OBSERVERS] = []
    this[ID] = signalId++
  }

  emit (value) {
    setTimeout(() => {
      for (var i = 0; i < this[OBSERVERS].length; i++) {
        this[OBSERVERS][i](value)
      }
    }, 0)
  }

  register (func) {
    this[OBSERVERS].push(func)
  }

  unregister (func) {
    const index = this[OBSERVERS].indexOf(func)
    if (index > -1) {
      this[OBSERVERS].splice(index, 1)
    }
  }

  toString () {
    return 'Signal#' + this[ID]
  }
}
