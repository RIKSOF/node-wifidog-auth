/**
 * Copyright RIKSOF (Private) Limited 2016.
 *
 * Wifi Dog Controller to handle login / portal requests.
 */

// Reference to the module to be exported
wifidog = module.exports = {};

/**
 * Setup takes an express application server and configures
 * it to handle errors.
 */
wifidog.setup = function( app, gateways, clients ) {
  // Get the configurations
  var config = require(__dirname + '/../config');

  // Our logger for logging to file and console
  var logger = require(__dirname + '/../services/logger');
	
	/**
	 * Receive request to login
	 */
	app.get( '/login', function( req, res ) {
    
    // Get the moment now
    var moment = require( 'moment' );
    var now = moment();
    
    // Get the client IP
    var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    var token = '';
    
    // If we have the client, send its information. Otherwise send information
    // that is generated now.
    var c = clients.get( ip );
    
    if ( !c ) {
      // Generate a token for this client
      var crypt = require('crypto');
      token = crypt.randomBytes( 64 ).toString('hex');
    
      // Update the client information
      clients.set( ip, token, req.query.gw_id, Math.floor( now.format( 'x' ) ) );
      clients.setAuthType( ip, clients.AUTH_TYPES.AUTH_VALIDATION );
    }
    
    if ( config.app.mode.current == config.app.mode.DEVELOPMENT )
      console.log( 'Registered clients: ' + JSON.stringify( clients.getAll() ));
    
    // Register token with gateway
    res.redirect( 'http://' + req.query.gw_address + ':' + req.query.gw_port + '/wifidog/auth?token=' + token );
  });
}