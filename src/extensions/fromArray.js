const Signal = require('../signal')

module.exports = (Bourn, SIGNALS) => {
  Bourn.prototype.fromArray = function (array) {
    const signal = new Signal(this[SIGNALS])
    for (let i = 0; i < array.length; i++) {
      signal.emit(array[i])
    }
    return this.copy()
  }
}
