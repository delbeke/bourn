module.exports = (Bourn, SIGNALS) => {
  Bourn.prototype.toPromise = function (func) {
    return new Promise((resolve) => {
      for (let i = 0; i < this[SIGNALS].length; i++) {
        this[SIGNALS][i].register(resolve)
      }
    })
  }
}
