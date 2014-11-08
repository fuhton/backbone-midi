// : main
'use strict';

var Backbone = require('backbone');
var $ = require('jquery');

window.jQuery = $;
window.app_id = '';

Backbone.$ = window.jQuery;

var MidiApp = require('./midi/init');
var NoteView = require( './views/noteView' );

$( document ).ready( function() {

	var notesView = new NoteView();
	var midiApp = new MidiApp();

});
