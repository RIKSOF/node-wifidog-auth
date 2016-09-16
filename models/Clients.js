/**
 * Copyright RIKSOF (Private) Limited 2016.
 *
 * List of registered clients.
 */

// Reference to the module to be exported
clients = module.exports = {};

// Initialize a list of clients.
clients.list = {};

// Authenication Types.
clients.AUTH_TYPES = {
  AUTH_DENIED: 0,
  AUTH_VALIDATION_FAILED: 6,
  AUTH_ALLOWED: 1,
  AUTH_VALIDATION: 5,
  AUTH_ERROR: -1
}

/**
 * Get details of a client based on its IP.
 *
 * @param client_ip  IP of the client
 */
clients.get = function( client_ip ) {
  client_ip = client_ip.replace( '::ffff:', '' );
  return clients.list[ client_ip ];
}

/**
 * Update or add a new client's information.
 *
 * @param client_ip IP of the client
 * @param token Token issued to the client
 * @param gw_id ID of the gateway this client is associated with.
 * @param last_ping Last we hear from this client.
 */
clients.set = function( client_ip, token, gw_id, last_ping ) {
  client_ip = client_ip.replace( '::ffff:', '' );
  
  if ( !clients.list[ client_ip ] ) {
    clients.list[ client_ip ] = {}
  }
  
  var c = clients.list[ client_ip ];
  c.clientIP = client_ip;
  c.token = token;
  c.gwid = gw_id; 
  c.lastPingTime = last_ping;
}

/**
 * Update statistical information on  a client.
 *
 * @param client_ip IP of the client
 * @param stage login or counters depending on whether client has access to network
 *              or waiting to login 
 * @param mac MAC address
 * @param incoming Counter for incoming traffic.
 * @param outgoing Counter for outgoing traffic.
 * @param last_ping Last we hear from this client.
 */
clients.setStatistical = function( client_ip, stage, mac, incoming, outgoing, last_ping ) {
  var c = clients.get( client_ip );
  if ( c ) {
    c.clientIP = client_ip;
    c.stage = stage;
    c.mac = mac;
    c.incoming = incoming;
    c.outgoing = outgoing;
    c.lastPingTime = last_ping;
  }
}

/**
 * Update authentication for this client.
 *
 * @param client_ip IP of the client.
 * @param auth Auth type
 */
clients.setAuthType = function( client_ip, auth ) {
  var c = clients.get( client_ip );
  if (  c ) {
    c.auth = auth;
  }
}

/**
 * Update last ping time.
 *
 * @param client_ip IP of the client.
 * @param last_ping Update last ping.
 */
clients.setLastPing = function( client_ip, last_ping ) {
  var c = clients.get( client_ip );
  if (  c ) {
    c.lastPingTime = last_ping;
  }
}

/**
 * Update last login time.
 *
 * @param client_ip IP of the client.
 * @param login Update login time.
 */
clients.setLoginTime = function( client_ip, login ) {
  var c = clients.get( client_ip );
  if (  c ) {
    c.loginTime = login;
  }
}

/**
 * Update last logout time.
 *
 * @param client_ip IP of the client.
 * @param last_logout Update last logout time.
 */
clients.setLogoutTime = function( client_ip, last_logout ) {
  var c = clients.get( client_ip );
  if (  c ) {
    c.lastLogOutTime = last_logout;
  }
}

/**
 * Update email for this client.
 *
 * @param client_ip IP of the client.
 * @param email Email
 */
clients.setEmail = function( client_ip, email, name ) {
  var c = clients.get( client_ip );
  if (  c ) {
    c.email = email;
    c.name = name;
  }
}

/**
 * Get details of all clients.
 */
clients.getAll = function( ) {
  return clients.list;
}

/**
 * Get details of all clients.
 */
clients.getArray = function( ) {
  var a = []
  
  for (var key in clients.list) {
    a.push( clients.list[ key ] );
  }
  
  return a;
}

/**
 * Remove a client
 *
 * @param client_ip  IP of the client
 */
clients.remove = function( client_ip ) {
  delete clients.list[ client_ip ];
}

/**
 * Save list to file.
 */
clients.save = function( ) {
  // Get the configurations
  var config = require(__dirname + '/../config');
  
  var d = JSON.stringify( clients.list );
  
  // Write this to file.
  var fs = require('fs');
  fs.writeFile( config.app.data, d, function(err) {
    if ( err ) {
      console.log( err );
    }
    console.log("The file was saved!");
  }); 
}

/**
 * Read data from file.
 */
clients.load = function( ) {
  // Get the configurations
  var config = require(__dirname + '/../config');
  
  var fs = require( 'fs' );
  
  fs.readFile( config.app.data, 'utf8', function (err, data) {
    if (err) {
      console.log( err );
    } else {
      clients.list = JSON.parse(data);
      console.log( 'File read!' );
    }
  });
}
