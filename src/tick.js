const INTERVAL_TOKEN = Symbol()
const INDEX = Symbol()

module.exports = class Tick {
  constructor (intervalToken, index) {
    this[INTERVAL_TOKEN] = intervalToken
    this[INDEX] = index
  }

  get index () {
    return this[INDEX]
  }

  stop () {
    clearInterval(this[INTERVAL_TOKEN])
  }
}
