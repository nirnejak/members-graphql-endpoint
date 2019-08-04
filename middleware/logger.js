const moment = require('moment')

exports.logger = (req, res, next) => {
  console.log(`${req.method}: ${req.protocol}://${req.get('host')}${req.originalUrl}: ${moment().format()}`)
  next()
}