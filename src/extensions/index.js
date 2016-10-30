const EXTENSIONS = [
  'fromValue',
  'fromEvent',
  'fromArray',
  'fromTimer',
  'toFunction',
  'toPromise',
  'intoArray',
  'all',
  'count',
  'valve'
]

const modules = []
for (var i = 0; i < EXTENSIONS.length; i++) {
  modules.push(require(`./${EXTENSIONS[i]}`))
}
module.exports = modules
