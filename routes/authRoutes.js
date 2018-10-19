const passport = require('passport')

module.exports = app => {
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  )

  // in callback route, code is present in URI so passport sees that and handles it
  app.get(
    '/auth/google/callback',
    passport.authenticate('google')
  )

  app.get('/api/logout', (req, res) => {
    req.logout()
    res.send(req.user)
  })

  app.get('/api/current_user', (req, res) => {
    res.send(req.session)
    // res.send(req.user)
  })
}
