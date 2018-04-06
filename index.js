

/**
 * Given an expiration date, filter dates that are
 * valid, expired or expire soon.
 *
 * @param {Array} arr
 * @param {Number|Date|String} limit
 * @param {Number} soon
 * @return {Object}
 * @api public
 */

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


/**
 * Parse given time into a date in ms.
 *
 * @param {Date|Number|String} time
 * @return {Number}
 * @api private
 */

function parse (time) {
  return typeof time === 'number' ? time : Date.parse(time)
}
