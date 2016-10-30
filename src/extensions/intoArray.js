module.exports = (Bourn, SIGNALS) => {
  Bourn.prototype.intoArray = function (array) {
    this.toFunction((v) => {
      array.push(v)
    })
    return this.copy()
  }
}
