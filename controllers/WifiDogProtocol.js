/**
 * Copyright RIKSOF (Private) Limited 2016.
 *
 * Wifi Dog Protocol.
 */

// Reference to the module to be exported
protocol = module.exports = {};

/**
 * Setup takes an express application server and configures
 * it to handle errors.
 */
protocol.setup = function( app ) {
  // Get the configurations
  var config = require(__dirname + '/../config');

  // Our logger for logging to file and console
  var logger = require(__dirname + '/../services/logger');
	
	/**
	 * Receive ping from the gateway. Respond with a pong.
	 */
	app.get( '/ping', function( req, res ) {
    res.send( 'Pong' );
  });
}