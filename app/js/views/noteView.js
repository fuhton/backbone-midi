// view : noteView
'use strict';

var $ = require('jquery')(window),
    Backbone = require('backbone');

module.exports = Backbone.View.extend({
    el: document,

    currentKeys: [],

    events: {
        "keydown": "logKeyDown",
        'keyup': 'logKeyUp',
    },

    logKeyDown: function(e) {
        var code = e.keyCode;
        if ( this.currentKeys.indexOf( code ) === -1 ) {
            this.currentKeys.push(code);
            BackboneEvents.trigger( "note:down", this );
            console.log(e.type, e.keyCode);
        }
    },
    logKeyUp: function(e) {
        var code = e.keyCode;
        if ( this.currentKeys.indexOf( code ) !== -1 ) {
            this.currentKeys.splice( this.currentKeys.indexOf( code ), 1 );
        }
        console.log(e.type, e.keyCode);
        BackboneEvents.trigger( "note:up", this );
    }
});
