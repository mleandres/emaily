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
}
