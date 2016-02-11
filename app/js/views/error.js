// view : noteView

var _ = require('underscore');
var Backbone = require('backbone');
var $ = require('jquery');

module.exports = Backbone.View.extend({

	el: '#main',

	events: {
		'submit #auth-form': 'submit'
	},

	initialize: function() {
		this.el = jQuery( this.el );
	},

	render: function( text ) {
		window.app_midi.app_id = options._id;
		this.model.set('_id', window.app_midi.app_id);
		this.$el.html( this.outputTemplate( options ) );
	},

});
