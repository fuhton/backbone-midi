// view : noteView
'use strict';

var _ = require('underscore');
var Backbone = require('backbone');
var $ = require('jquery');
var inputTemplate = require('../../partials/input.html');
var outputTemplate = require('../../partials/output.html');

Backbone.$ = window.jQuery;

var Note = require( '../models/note.js' );

module.exports = Backbone.View.extend({

	inputTemplate: _.template( inputTemplate ),
	outputTemplate: _.template( outputTemplate ),

	el: '#main',

	events: {
		'submit #auth-form': 'submit'
	},

	initialize: function() {
		this.renderForm();
		this.model = new Note();
	},

	render: function( options ) {
		window.app_midi.app_id = options._id;
		this.model.set('_id', window.app_midi.app_id);
		this.$el.html( this.outputTemplate( options ) );
	},

	renderForm: function() {
		this.$el.html( this.inputTemplate() );
	},

	submit: function(e) {
		var self = this, form = jQuery("#auth-form");
		e.preventDefault();

		window.app_midi.app_key = form.find( '#app_key' ).val();
		window.app_midi.app_sec = form.find( '#app_sec' ).val();
		window.app_midi.app_time = form.find( '#app_time' ).val();
		window.app_midi.app_note = form.find( '#app_note' ).val();

		if ( window.app_midi.app_key && window.app_midi.app_sec && window.app_midi.app_time && window.app_midi.app_note ) {
			//Save the model and get response
			self.model.save(
				{
					meta: {
						time: window.app_midi.app_time,
						note: window.app_midi.app_note,
					}
				},
				{
					success: function (model, response) {
						self.render( response );
					},
					error: function (model, response) {
						self.$el.append("<div class='error'>" + response.responseText + "</div>");
					}
				}
			);
		}

	},


});
