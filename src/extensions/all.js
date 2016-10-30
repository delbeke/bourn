const Signal = require('../signal')

const getSignalsMap = (signals) => {
  const map = {}
  for (var i = 0; i < signals.length; i++) {
    map[signals[i]] = true
  }
  return map
}

module.exports = (Bourn, SIGNALS) => {
  Bourn.prototype.all = function (options = {}) {
    const allSignal = new Signal()
    let signalMap, signalCount, data
    const init = () => {
      signalCount = this[SIGNALS].length
      signalMap = getSignalsMap(this[SIGNALS])
      data = []
    }
    init()
    for (let i = 0; i < this[SIGNALS].length; i++) {
      const signal = this[SIGNALS][i]
      const func = (value) => {
        if (signalMap[signal]) {
          delete signalMap[signal]
          signalCount--
          data.push(value)
          if (signalCount === 0) {
            allSignal.emit(data.slice())
            if (options.autoReset === true) {
              init()
            }
          }
        }
      }
      signal.register(func)
    }
    return new Bourn([allSignal])
  }
}
