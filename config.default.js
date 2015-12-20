/**
 * Copyright RIKSOF (Private) Limited 2016.
 *
 * System-wide configurations.
 */
var config = {}

// Application Information
config.app = {}
config.app.mode = {}
config.app.mode.DEVELOPMENT = 'development';
config.app.mode.PRODUCTION = 'production';
config.app.mode.current = config.app.mode.DEVELOPMENT;

// HTTP server configuration
config.http = {}
config.http.port = (config.app.mode.current == config.app.mode.DEVELOPMENT ) ? 3001 : 80;
config.http.enableSSL = false;

// Log files
config.logger = {}
config.logger.errorFile = __dirname + '/error.log';
config.logger.consoleFile = __dirname + '/console.log';
config.logger.maxFileSize = 1000000;
config.logger.maxFiles = 1;

// Google OAuth
config.google = {}
config.google.clientID = "Your ID Here";
config.google.secret = "Your secret Here";

// Make the configuration parameters available.
module.exports = config;
