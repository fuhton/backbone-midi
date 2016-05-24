// views : error

//var $ = require('jquery');
var Backbone = require( 'backbone' );

module.exports = Backbone.View.extend({

	el : '#main',

	initialize: function () {
		this.render();
		this.collection.on( 'reset', this.render, this );
	},

	render: function () {
		//this.$el.html( this.template( this.collection.toJSON() ) );
		return this;
	}

});
