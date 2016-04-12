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
    
    res.send( 'Pong' );
  });
  
	/**
	 * Used to verify to a gateway that the given client is authenitcated.
	 */
	app.get( '/auth', function( req, res ) {
    
    // By default we deny authentication.
    var auth = clients.AUTH_TYPES.AUTH_DENIED;
    
    // Get the moment now
    var moment = require( 'moment' );
    var now = moment();
    var nowInSeconds = Math.floor( now.format( 'x' ) );
    
    // What does the ap send?
    console.log( JSON.stringify( req.query ) );
    
    // Which client?
    var c = clients.get( req.query.ip );
    
    // If we have the client
    if ( c ) {
      auth = c.auth;
      
      switch ( auth ) {
      case clients.AUTH_TYPES.AUTH_VALIDATION:
        // Did we timeout?
        if ( nowInSeconds > c.lastPingTime + config.timeouts.validation ) {
          clients.setAuthType( req.query.ip, clients.AUTH_TYPES.AUTH_VALIDATION_FAILED );
          auth = clients.AUTH_TYPES.AUTH_VALIDATION_FAILED
        }
        
        break;
      case clients.AUTH_TYPES.AUTH_ALLOWED:
        // Did we timeout? We expect user to validate again.
        if ( nowInSeconds > c.lastPingTime + config.timeouts.expiration ) {
          
          // Set the last logout time
          clients.setLogoutTime( req.query.ip, c.lastPingTime );
          
          clients.setLastPing( req.query.ip, Math.floor( now.format( 'x' ) ) );
          clients.setAuthType( req.query.ip, clients.AUTH_TYPES.AUTH_VALIDATION );
          auth = clients.AUTH_TYPES.AUTH_VALIDATION
        } else {
          // Update the server information
          clients.setStatistical( req.query.ip, req.query.stage, req.query.mac, 
            req.query.incoming, req.query.outgoing, nowInSeconds );
        }
          
        break;
      }
      
      // Save state
      clients.save();
    }
     
    console.log( 'IP: ' + req.query.ip + ', Auth: ' + auth );
    
    res.send( 'Auth: ' + auth );
  });
}