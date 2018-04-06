/**
 * Dependencie(s)
 */

const test = require('tape')
const runout = require('..')


test('should sort dates with given expiration limit', assert => {
  assert.plan(1)
  const obj = runout([
    new Date('01-01-2000').getTime(),
    new Date('01-01-2100').getTime(),
    new Date('01-01-2300').getTime(),
  ], new Date('01-01-2101').getTime())
  assert.deepEqual(obj, {
    valid: [946710000000, 4102470000000],
    expired: [10413817200000]
  })
})


test('should convert dates in ms', assert => {
  assert.plan(1)
  const obj = runout([
    new Date('01-01-2000'),
    new Date('01-01-2100'),
    new Date('01-01-2300'),
  ], new Date('01-01-2101'))
  assert.deepEqual(obj, {
    valid: [946710000000, 4102470000000],
    expired: [10413817200000]
  })
})


test('should convert date strings into ms and sort them', assert => {
  assert.plan(1)
  const obj = runout([
    new Date('01-01-2000'),
    '01-01-2100',
    new Date('01-01-2300'),
  ], '01-01-2101')
  assert.deepEqual(obj, {
    valid: [946710000000, 4102470000000],
    expired: [10413817200000]
  })
})
