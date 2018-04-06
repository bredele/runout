/**
 * Dependencie(s)
 */

const test = require('tape')
const runout = require('..')


test('should filter valid and expired dates from a given expiration limit', assert => {
  assert.plan(1)
  const obj = runout([
    new Date('01-01-2000').getTime(),
    new Date('01-01-2100').getTime(),
    new Date('01-01-2300').getTime(),
  ], new Date('01-01-2101').getTime())
  assert.deepEqual(obj, {
    valid: [946710000000, 4102470000000],
    expired: [10413817200000],
    soon: []
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
    expired: [10413817200000],
    soon: []
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
    expired: [10413817200000],
    soon: []
  })
})


test('should filter dates that expire soon', assert => {
  assert.plan(1)
  const obj = runout([
    new Date('01-01-2000'),
    new Date('01-01-2100'),
    new Date('12-06-2100'),
    new Date('01-01-2300'),
  ], new Date('01-01-2101'), oneyear())
  assert.deepEqual(obj, {
    valid: [946710000000],
    expired: [10413817200000],
    soon: [4102470000000, 4131759600000]
  })
})


function oneyear () {
  return 1000 * 60 * 60 * 24 * 365
}
