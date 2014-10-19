// collection : notes
'use strict';

var $ = require('jquery')(window),
    Backbone = require('backbone'),
    Note = require( '../models/note.js' );

module.exports = Backbone.Collection.extend({

    model: Note,

});
