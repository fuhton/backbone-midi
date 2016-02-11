// model : note

var Backbone = require('backbone');
var Notes = require( '../collections/notes.js');

module.exports = Backbone.Model.extend({

	idAttribute: '_id',

	urlRoot: 'http://api.thatsmymidi.com/instances',

	defaults: {},

	initialize: function () {
		this.notes = new Notes();
		this.notes.parent = this;
	},

	sync: function( method, collection, options ) {
		options.beforeSend = function( xhr ) {
			var user = window.app_midi.app_key;
			var pass = window.app_midi.app_sec;
			var token = user.concat(':', pass);
			xhr.setRequestHeader('Authorization', ('Basic '.concat(btoa(token))));
		};

		return Backbone.sync.apply(this, arguments);
	},

});
