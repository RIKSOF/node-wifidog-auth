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
protocol.setup = function( app, gateways ) {
  // Get the configurations
  var config = require(__dirname + '/../config');

  // Our logger for logging to file and console
  var logger = require(__dirname + '/../services/logger');
	
	/**
	 * Receive ping from the gateway. Respond with a pong.
	 */
	app.get( '/ping', function( req, res ) {
    
    // Get the moment now
    var moment = require( 'moment' );
    var now = moment();
    
    // Update the server information
    gateways.set( req.query.gw_id, req.query.sys_uptime, req.query.sys_memfree, 
      req.query.sys_load, req.query.wifidog_uptime, Math.floor( now.format( 'x' ) ) );
    
    if ( config.app.mode.current == config.app.mode.DEVELOPMENT )
      console.log( 'Registered gateways: ' + JSON.stringify( gateways.getAll() ));
    
    res.send( 'Pong' );
  });
}