/**
 * Copyright RIKSOF (Private) Limited 2016.
 *
 * List of registered gateways.
 */

// Reference to the module to be exported
gateways = module.exports = {};

// Initialize a list of gateways.
gateways.list = {};

/**
 * Get details of a gateway based on its id.
 *
 * @param gw_id  ID of the gateway
 */
gateways.get = function( gw_id ) {
  return gateways.list[ gw_id ];
}

/**
 * Update or add a new gateways information.
 *
 * @param gw_id ID of the gateway
 * @param gw_ip IP of the gateway
 * @param sys_uptime Uptime for it
 * @param sys_memfree Availabile memory
 * @param sys_load Load on the gateway
 * @param wifidog_uptime Time since wifidog is up.
 * @param last_ping Last time we got a ping from this gateway.
 */
gateways.set = function( gw_id, gw_ip, sys_uptime, sys_memfree, sys_load, wifidog_uptime, last_ping ) {
  gateways.list[ gw_id ] = {
    gwid: gw_id,
    gwIP: gw_ip,
    sysUpTime: sys_uptime,
    sysMemFree: sys_memfree,
    sysLoad: sys_load,
    wifiDogUpTime: wifidog_uptime,
    lastPingTime: last_ping
  }
}

/**
 * Get details of all gateways.
 */
gateways.getAll = function( ) {
  return gateways.list;
}
