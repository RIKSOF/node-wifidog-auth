/**
 * Copyright RIKSOF (Private) Limited 2016.
 *
 * Logging service.
 */

// Dependencies
var winston = require( 'winston' );
var config = require( __dirname + '/../config' );

// Setup the logger
var logger = new (winston.Logger)({
    transports: [
      new (winston.transports.Console)(),
	  new (winston.transports.File)({ name: 'file#error', filename: config.logger.errorFile, level: 'error', 
	  maxsize: config.logger.maxFileSize, maxFiles: config.logger.maxFiles }),
	  new (winston.transports.File)({ name: 'file#all', filename: config.logger.consoleFile, maxsize: config.logger.maxFileSize, maxFiles: config.logger.maxFiles })
    ]
});

// Make the logger available to all
module.exports = logger;