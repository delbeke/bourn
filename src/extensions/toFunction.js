module.exports = (Bourn, SIGNALS) => {
  Bourn.prototype.toFunction = function (func) {
    for (let i = 0; i < this[SIGNALS].length; i++) {
      this[SIGNALS][i].register(func)
    }
    return this.copy()
  }
}
