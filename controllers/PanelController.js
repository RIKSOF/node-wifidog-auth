/**
 * Copyright RIKSOF (Private) Limited 2016.
 *
 * Controller to handle administration. Client needs to be logged in.
 */

// Reference to the module to be exported
panel = module.exports = {};

/**
 * Setup takes an express application server and configures
 * it to handle errors.
 */
panel.setup = function( app, gateways, clients ) {
  
  // Get the configurations
  var config = require(__dirname + '/../config');

  // Our logger for logging to file and console
  var logger = require(__dirname + '/../services/logger');
  
	/**
	 * Receive request to get list of all clients.
	 */
	app.get( '/api/clients', function( req, res ) {
    
    // Get the client IP
    var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    
    console.log( 'Panel access by IP: ' + ip );
    
    // Does this client have authorization on the network?
    var c = clients.get( ip );
    
    if ( c && c.auth == clients.AUTH_TYPES.AUTH_ALLOWED ) {
      res.json( clients.getArray() );
    } else {
      res.json( { status: 'Access Denied' } );
    }
  });
  
	/**
	 * Receive request to set status of a single client.
	 */
	app.get( '/api/clients/activate', function( req, res ) {
    
    // Get the client IP
    var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    
    console.log( 'Panel access by IP: ' + ip );
    
    // Does this client have authorization on the network?
    var c = clients.get( ip );
    
    if ( c && c.auth == clients.AUTH_TYPES.AUTH_ALLOWED ) {
      console.log( 'Activating IP: ' + req.query.ip );
      
      // Now get the client we want to set.
      var c = clients.get( req.query.ip );
      
      // If exists client
      if ( c ) {
        
        // Get the moment now and set it for user's time in.
        var moment = require( 'moment' );
        var now = moment();
        
        // Make sure client was not authenticated before. If so, update their
        // logout and login time.
        if ( c.auth != clients.AUTH_TYPES.AUTH_ALLOWED ) {
          clients.setLoginLogoutTimes( req.query.ip, Math.floor( now.format( 'x' ) ), 
                                       c.lastPingTime );
        }
        
        clients.setAuthType( req.query.ip, clients.AUTH_TYPES.AUTH_ALLOWED );
        
        clients.setLastPing( req.query.ip, Math.floor( now.format( 'x' ) ) );
        res.json( { status: 'OK' } );
      } else {
        res.json( { status: 'Not Found' } );
      }
      
      // Save changes
      clients.save();
    } else {
      res.json( { status: 'Access Denied' } );
    }
  });
  
}