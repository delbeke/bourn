const Signal = require('../signal')
const Tick = require('../tick')

module.exports = (Bourn, SIGNALS) => {
  Bourn.prototype.fromTimer = function (interval) {
    const signal = new Signal(this[SIGNALS])
    let counter = 0
    const token = setInterval(() => {
      signal.emit(new Tick(token, counter++))
    }, interval)
    return this.copy()
  }
}
