// collection : notes

var Backbone = require('backbone');
var Note = require( '../models/note.js' );

module.exports = Backbone.Collection.extend({

	model: Note,

	url: 'http://api.thatsmymidi.com/instances',

});
