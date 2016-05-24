/**
 * Event Routing module
 */

var Backbone = require( 'backbone' );
var _        = require( 'underscore' );
var jQuery   = require( 'jquery' );

module.exports = Backbone.Router.extend({

	initialize : function( options ) {
		_.extend( this, options );
		var self = this;
		Backbone.history.start();

	},

	routes: {
		'signin'   : 'signin',
		'*actions' : 'defaultRoute',
	},

	signin : function() {
		console.log( 'SIGNIN' );
	},

	defaultRoute : function() {
		console.log('ROUTING');
		return this;
	},

	navigate : function( path ) {
		return Backbone.history.navigate( path, true );
	},

});
