
//if user is not logged in, exits middleware and sends error message
module.exports = (req, res, next) => {
  if (!req.user) {
    return res.status(401).send({ error: 'You must login!' })
  }
  next();//if there is a user, continue to request handler
}