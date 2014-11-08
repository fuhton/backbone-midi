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
		window.app_id = options._id;
		this.$el.html( this.outputTemplate( options ) );
	},

	renderForm: function() {
		this.$el.html( this.inputTemplate() );
	},

	submit: function(e) {
		var self = this, form = jQuery("#auth-form");
		e.preventDefault();

		self.app_key = form.find( '#app_key' ).val();
		self.app_sec = form.find( '#app_sec' ).val();
		self.app_time = form.find( '#app_time' ).val();
		self.app_note = form.find( '#app_note' ).val();

		if ( self.app_key && self.app_sec && self.app_time && self.app_note ) {
			//Save the model and get response
			self.model.save(
				{
					meta: {
						time: self.app_time,
						note: self.app_note,
					}
				},
				{
					beforeSend: function( xhr ) {
						var user = self.app_key;
						var pass = self.app_sec;
						var token = user.concat(':', pass);
						xhr.setRequestHeader('Authorization', ('Basic '.concat(btoa(token))));
					},
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
