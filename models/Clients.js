/**
 * Copyright RIKSOF (Private) Limited 2016.
 *
 * List of registered clients.
 */

// Reference to the module to be exported
clients = module.exports = {};

// Initialize a list of clients.
clients.list = {};

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
 * @param stage login or counters depending on whether client has access to network
 *              or waiting to login 
 * @param mac MAC address
 * @param token Token issued to the client
 * @param gw_id ID of the gateway this client is associated with.
 * @param incoming Counter for incoming traffic.
 * @param outgoing Counter for outgoing traffic.
 * @param last_ping Last we hear from this client.
 */
clients.set = function( client_ip, stage, mac, token, gw_id, incoming, outgoing, last_ping ) {
  clients.list[ client_ip ] = {
    clientIP: client_ip,
    stage: stage,
    mac: mac,
    token: token,
    gwid: gw_id, 
    incoming: incoming,
    outgoing: outgoing,
    lastPingTime: last_ping
  }
}

/**
 * Get details of all clients.
 */
clients.getAll = function( ) {
  return clients.list;
}
