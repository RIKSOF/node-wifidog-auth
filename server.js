/**
 * Copyright RIKSOF (Private) Limited 2016.
 *
 * Main Server.
 */

// Get the configurations
var config = require( __dirname + '/config' );

// Our logger for logging to file and console
var logger = require( __dirname + '/services/logger' );

// Instance for express server
var express = require( 'express' );
var app = express();

// Initialize the models.
var gateways = require( __dirname + '/models/Gateways.js' );
var clients = require( __dirname + '/models/Clients.js' );

// Configure all controllers for this application
var protocol = require( __dirname + '/api/WifiDogProtocol.js' );
protocol.setup( app, gateways, clients );

// Start the http server
var httpServer;

var http = require('http');
httpServer = http.createServer(app);

// Make the server listen
httpServer.listen( config.http.port );
logger.info( 'Listening on port ' + config.http.port + ' with SSL ' + config.http.enableSSL );
