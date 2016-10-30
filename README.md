# bourn
Module making it easy to work with events and other async concepts.

## todo

* write documentation
* write more tests to have full coverage
* improve code
  * Add error handling
  * Cleanup code

## contribute

Feel free to submit pull requests.

## examples

* If both events are fired while the condition was true, an action is performed:

```js
Bourn()
  .fromEvent(subject1, 'eventName')
  .fromEvent(subject2, 'eventName')
  .valve(() => condition === true)
  .all({ autoReset: true })
  .toFunction(() => performAction())
```

* Await until one of both events are fired:

```js
await Bourn()
  .fromEvent(subject1, 'eventName')
  .fromEvent(subject2, 'eventName')
  .toAsync()
```

* Await until an async function is executed and event is fired

```js
await Bourn()
  .fromAsync(async () => { ... })
  .fromEvent(subject2, 'eventName')
  .all({ autoReset: false })
  .toAsync()
```

* clock that ticks every second with alarm after 5 seconds

```js
await Bourn()
  .fromClock(1000)
  .toFunction(() => tick())
  .count(5, { autoReset: false })
  .toFunction(() => alarm())
```

* writes value to console

```js
await Bourn()
  .fromValue(1)
  .toFunction((v) => console.log(v))
```

* writes each value of the array as separate lines to console

```js
await Bourn()
  .fromArray([1, 2, 3])
  .toFunction((v) => console.log(v))
```

* collect event data into array, reset array every 10 events:

```js
let data = []
await Bourn()
  .fromEvent(subject, 'eventName')
  .intoArray(data)
  .count(10, { autoReset: true })
  .toFunction(() => { data = [] })
```

* Use 2 conditions for same events:

```js
const bourn = Bourn()
  .fromTimer(500)
  .fromEvent(subject2, 'eventName')

bourn()
  .valve(() => condition1 === true)
  .toFunction(() => { ... })

bourn()
  .valve(() => condition2 === true)
  .toFunction(() => { ... })


```
