const jwt = require('jsonwebtoken')

exports.authMiddleware = (req, res, next) => {
  if (req.url.includes("/api") && ["POST", "PUT", "DELETE"].includes(req.method)) {
    const bearerHeader = req.headers['authorization'];

    if (typeof bearerHeader !== "undefined") {
      const bearer = bearerHeader.split(" ")
      const bearerToken = bearer[1]
      req.token = bearerToken
      next()
    } else {
      // Forbidden
      res.sendStatus(403)
    }
  }
  next()
}