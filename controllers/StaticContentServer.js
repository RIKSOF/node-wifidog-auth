/**
 * This module is responsible for configuring how the server
 * handles requests for static content, images, javascript
 * and html
 */

// Reference to the module to be exported
contentServer = module.exports = {};

/**
 * Setup takes an express application server and configures
 * it to handle JavaScript requests. If the server is being
 * run in development mode, then we expose these directories:
 *
 * - js
 * - libs
 * - tests
 *
 * Otherwise, only the libs directory is exposed. Contents of
 * the js directory are combined to a minimised javascript file.
 */
contentServer.setup = function( app, express ) {
	// Get the configurations
	var config = require( __dirname + '/../config' );
	
  app.use('/libs', express.static( __dirname + '/../bower_components' ) );
	app.use('/web', express.static( __dirname + '/../views' ) );
  app.use('/js', express.static( __dirname + '/../js' ) );
  app.use('/css', express.static( __dirname + '/../css' ) );
}
