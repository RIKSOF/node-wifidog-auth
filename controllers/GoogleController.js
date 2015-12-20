/**
 * Copyright RIKSOF (Private) Limited 2016.
 *
 * Controller to handle login and session with Google.
 */

// Reference to the module to be exported
google = module.exports = {};

/**
 * Setup takes an express application server and configures
 * it to handle errors.
 */
google.setup = function( app, gateways, clients ) {

  // Get the configurations
  var config = require(__dirname + '/../config');

  // Our logger for logging to file and console
  var logger = require(__dirname + '/../services/logger');

  // Configure passport
  passport = require('passport');

  /**
   * Configure the Google Strategy.
   */
  GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

  /**
   * Use the GoogleStrategy within Passport.
   * Strategies in Passport require a `verify` function, which accept
   * credentials (in this case, an accessToken, refreshToken, and Google
   * profile), and invoke a callback with a user object.
   */
  passport.use(new GoogleStrategy({
    clientID: config.google.clientID,
    clientSecret: config.google.secret,
    callbackURL: config.google.callbackURL
  },
  function(accessToken, refreshToken, profile, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {
      
      console.log( JSON.stringify( profile.emails ) );
      
      return done( null, profile );
    });
  }));
  
  /**
   * Use passport.authenticate() as route middleware to authenticate the
   * request.  The first step in Google authentication will involve
   * redirecting the user to google.com.  After authorization, Google
   * will redirect the user back to this application at /auth/google/callback
   */
  app.get('/portal',
    passport.authenticate('google', { scope: ['email'], session: false }),
      function(req, res) {
        // The request will be redirected to Google for authentication, so this
        // function will not be called.
  });
  
  // Configure passport to be used in the app.
  app.use( passport.initialize() );

  /**
   * Use passport.authenticate() as route middleware to authenticate the
   * request.  If authentication fails, the user will be redirected back to the
   * login page.  Otherwise, the primary route function function will be called,
   * which, in this example, will redirect the user to the page they were visiting
   * before being interrupted to login.
   */
  app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login', session: false }),
  function(req, res) {
    res.redirect('/');
  });
}