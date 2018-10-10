const router = require('express').Router()

// TODO: Add routes here
// router.use('/cards', require('./cards))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})

module.exports = router
