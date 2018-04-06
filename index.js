

module.exports = (arr, limit) => {
  const obj = { valid: [], expired: [] }
  limit = parse(limit)
  arr.map(time => {
    time = parse(time)
    if (time < limit) obj.valid.push(time)
    else obj.expired.push(time)
  })
  return obj
}


function parse (time) {
  return typeof time === 'number' ? time : Date.parse(time)
}
