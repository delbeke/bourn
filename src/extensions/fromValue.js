const Signal = require('../signal')

module.exports = (Bourn, SIGNALS) => {
  Bourn.prototype.fromValue = function (value) {
    const signal = new Signal(this[SIGNALS])
    signal.emit(value)
    return this.copy()
  }
}
