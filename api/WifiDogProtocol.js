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
protocol.setup = function( app, gateways, clients ) {
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
    
    // Get the ip of gateway
    var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    
    // Update the server information
    gateways.set( req.query.gw_id, ip, req.query.sys_uptime, req.query.sys_memfree, 
      req.query.sys_load, req.query.wifidog_uptime, Math.floor( now.format( 'x' ) ) );
    
    if ( config.app.mode.current == config.app.mode.DEVELOPMENT )
      console.log( 'Registered gateways: ' + JSON.stringify( gateways.getAll() ));
    
    res.send( 'Pong' );
  });
  
	/**
	 * Receive ping from the gateway. Respond with a pong.
	 */
	app.get( '/auth', function( req, res ) {
    
    // Get the moment now
    var moment = require( 'moment' );
    var now = moment();
    
    // Update the server information
    clients.setStatistical( req.query.ip, req.query.stage, req.query.mac, 
      req.query.incoming, req.query.outgoing, Math.floor( now.format( 'x' ) ) );
    
    if ( config.app.mode.current == config.app.mode.DEVELOPMENT )
      console.log( 'Registered clients: ' + JSON.stringify( clients.getAll() ));
    
    res.send( 'Auth: 0' );
  });
}