// model : note
'use strict';

var $ = require('jquery')(window),
    Backbone = require('backbone'),
    Notes = require( '../collections/notes.js');

module.exports = Backbone.Model.extend({

    defaults: {
    },

    initialize: function ( options ) {
        this.notes = new Notes();
        this.notes.parent = this;
    },

});
