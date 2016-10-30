const Signal = require('../signal')

module.exports = (Bourn, SIGNALS) => {
  Bourn.prototype.valve = function (condition) {
    const newSignals = []
    for (let i = 0; i < this[SIGNALS].length; i++) {
      const signal = new Signal(newSignals)
      const func = (value) => {
        if (condition(value)) {
          signal.emit(value)
        }
      }
      this[SIGNALS][i].register(func)
    }
    return new Bourn(newSignals)
  }
}
