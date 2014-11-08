// model : note
'use strict';

var Backbone = require('backbone');

var Notes = require( '../collections/notes.js');

module.exports = Backbone.Model.extend({

	urlRoot: 'http://api.thatsmymidi.com/instances',

	defaults: {
	},

	initialize: function () {
		this.notes = new Notes();
		this.notes.parent = this;
	},

});
