const extensions = require('./extensions/')
const SIGNALS = Symbol()
const ID = Symbol()
let bournId = 0

class Bourn {
  constructor (signals = []) {
    this[SIGNALS] = signals
    this[ID] = bournId++
  }

  copy () {
    return new Bourn(this[SIGNALS])
  }

  toString () {
    return this[ID]
  }
}

// decorate class with extensions
for (var i = 0; i < extensions.length; i++) {
  extensions[i](Bourn, SIGNALS)
}

module.exports = function () {
  return new Bourn()
}
