const Signal = require('../signal')

module.exports = (Bourn, SIGNALS) => {
  Bourn.prototype.fromEvent = function (eventObj, eventName) {
    const signal = new Signal(this[SIGNALS])
    if (typeof eventObj.addEventListener === 'function') {
      eventObj.addEventListener(eventName, (evt) => {
        signal.emit(evt)
      })
    } else if (typeof eventObj.on === 'function') {
      eventObj.on(eventName, (evt) => {
        signal.emit(evt)
      })
    }
    return this.copy()
  }
}
