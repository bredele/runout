/**
 * Dependencie(s)
 */

const test = require('tape')
const runout = require('..')


test('should sort dates with given expiration limit', assert => {
  assert.plan(1)
  const obj = runout([
    new Date('01-01-2200').getTime(),
    new Date('01-01-2100').getTime(),
    new Date('01-01-2300').getTime(),
  ], new Date('01-01-2101').getTime())
  assert.deepEqual(obj, {
    valid: [7258143600000, 4102470000000],
    expired: [10413817200000]
  })
})
