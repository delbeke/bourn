const Signal = require('../signal')

module.exports = (Bourn, SIGNALS) => {
  Bourn.prototype.count = function (length, options = {}) {
    const signal = new Signal()
    let counter = 0
    let data = []
    this.toFunction((item) => {
      counter++
      data.push(item)
      if (counter === length) {
        signal.emit(data)
        data = []
        if (options.autoReset === true) {
          counter = 0
        }
      }
    })
    return new Bourn([signal])
  }
}
