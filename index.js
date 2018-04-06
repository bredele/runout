

module.exports = (arr, limit, soon = 0) => {
  const obj = { valid: [], expired: [], soon: []}
  limit = parse(limit)
  arr.map(time => {
    time = parse(time)
    if (time < limit) {
      if ((limit - soon) <= time && time < limit) {
        obj.soon.push(time)
      } else {
        obj.valid.push(time)
      }
    } else obj.expired.push(time)
  })
  return obj
}


function parse (time) {
  return typeof time === 'number' ? time : Date.parse(time)
}
