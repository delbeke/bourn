const B = require('../../src/index')

describe('to function', function () {
  it('should execute fromValue', () => {
    const promise = new Promise((resolve) => {
      B()
        .fromValue(1)
        .toFunction((v) => resolve(v))
    })
    return expect(promise).to.eventually.equal(1)
  })

  it('should execute multiple fromValue', () => {
    const promise = new Promise((resolve) => {
      const data = []
      B()
        .fromValue(1)
        .fromValue(2)
        .toFunction((v) => {
          data.push(v)
          if (data.length === 2) {
            resolve(data)
          }
        })
    })
    return expect(promise).to.eventually.deep.equal([1, 2])
  })

  it('should execute fromArray', () => {
    const promise = new Promise((resolve) => {
      const data = []
      B()
        .fromArray([1, 2, 3])
        .toFunction((v) => {
          data.push(v)
          if (data.length === 3) {
            resolve(data)
          }
        })
    })
    return expect(promise).to.eventually.deep.equal([1, 2, 3])
  })

  it('should execute fromArray with count', () => {
    const promise = new Promise((resolve) => {
      const data = []
      B()
        .fromArray([1, 2, 3, 4, 5, 6, 7])
        .count(3, { autoReset: true })
        .toFunction((v) => {
          data.push(v)
          if (data.length === 2) {
            resolve(data)
          }
        })
    })
    return expect(promise).to.eventually.deep.equal([[1, 2, 3], [4, 5, 6]])
  })

  it('should execute fromArray with valve', () => {
    const promise = new Promise((resolve) => {
      const data = []
      B()
        .fromArray([1, 2, 3, 4, 5, 6, 7])
        .valve((v) => (v % 2 === 0))
        .toFunction((v) => {
          data.push(v)
          if (data.length === 3) {
            resolve(data)
          }
        })
    })
    return expect(promise).to.eventually.deep.equal([2, 4, 6])
  })

  it('should execute timer', () => {
    const promise = new Promise((resolve) => {
      const data = []
      B()
        .fromTimer(10)
        .toFunction((v) => {
          data.push(v.index)
          if (data.length === 3) {
            v.stop()
            resolve(data)
          }
        })
    })
    return expect(promise).to.eventually.deep.equal([0, 1, 2])
  })
})
