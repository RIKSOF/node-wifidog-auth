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
  var c = clients.list[ client_ip ];
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
  var c = clients.list[ client_ip ];
  if (  c ) {
    c.auth = auth;
  }
}

/**
 * Update email for this client.
 *
 * @param client_ip IP of the client.
 * @param email Email
 */
clients.setEmail = function( client_ip, email ) {
  var c = clients.list[ client_ip ];
  if (  c ) {
    c.email = email;
  }
}

/**
 * Get details of all clients.
 */
clients.getAll = function( ) {
  return clients.list;
}

/**
 * Remove a client
 *
 * @param client_ip  IP of the client
 */
clients.remove = function( client_ip ) {
  delete clients.list[ client_ip ];
}
