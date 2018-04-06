/**
 * Dependencie(s)
 */

const test = require('tape')
const runout = require('..')


test('should filter valid and expired dates from a given expiration limit', assert => {
  assert.plan(1)
  const dates = [
    new Date('01-01-2000').getTime(),
    new Date('01-01-2100').getTime(),
    new Date('01-01-2300').getTime(),
  ]
  const obj = runout(dates, new Date('01-01-2101').getTime())
  assert.deepEqual(obj, {
    valid: [dates[0], dates[1]],
    expired: [dates[2]],
    soon: []
  })
})


test('should convert dates in ms', assert => {
  assert.plan(1)
  const dates = [
    new Date('01-01-2000'),
    new Date('01-01-2100'),
    new Date('01-01-2300'),
  ]
  const obj = runout(dates, new Date('01-01-2101'))
  assert.deepEqual(obj, {
    valid: [dates[0].getTime(), dates[1].getTime()],
    expired: [dates[2].getTime()],
    soon: []
  })
})


test('should convert date strings into ms and sort them', assert => {
  assert.plan(1)
  const dates = [
    new Date('01-01-2000'),
    '01-01-2100',
    new Date('01-01-2300'),
  ]
  const obj = runout(dates, '01-01-2101')
  assert.deepEqual(obj, {
    valid: [dates[0].getTime(), new Date(dates[1]).getTime()],
    expired: [dates[2].getTime()],
    soon: []
  })
})


test('should filter dates that expire soon', assert => {
  assert.plan(1)
  const dates = [
    new Date('01-01-2000'),
    new Date('01-01-2100'),
    new Date('12-06-2100'),
    new Date('01-01-2300'),
  ]
  const obj = runout(dates, new Date('01-01-2101'), oneyear())
  assert.deepEqual(obj, {
    valid: [dates[0].getTime()],
    expired: [dates[3].getTime()],
    soon: [dates[1].getTime(), dates[2].getTime()]
  })
})


function oneyear () {
  return 1000 * 60 * 60 * 24 * 365
}
