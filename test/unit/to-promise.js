const B = require('../../src/index')

describe('to promise', function () {
  it('should execute', () => {
    const promise = B()
        .fromValue(1)
        .toPromise()
    return expect(promise).to.eventually.equal(1)
  })

  it('should execute with count', () => {
    const promise = B()
        .fromValue(1)
        .fromArray([2, 3, 4, 5])
        .count(3)
        .toPromise()
    return expect(promise).to.eventually.deep.equal([1, 2, 3])
  })

  it('should execute intoArray', () => {
    const array = []
    const promise = B()
        .fromArray([1, 2, 3, 4, 5])
        .count(4)
        .intoArray(array)
        .toPromise()
        .then((value) => {
          return array
        })
    return expect(promise).to.eventually.deep.equal([[1, 2, 3, 4]])
  })

  it('should complete if all events fired', () => {
    const promise = B()
        .fromValue(1)
        .fromValue(2)
        .all()
        .toPromise()
    return expect(promise).to.eventually.deep.equal([1, 2])
  })
})
