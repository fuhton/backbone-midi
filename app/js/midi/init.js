// midi : init
'use strict';

var $ = require('jquery');
var device = require('./device');
var reject = require('./reject');

window.app_context=null;
window.app_midiAccess=null;
window.app_activeNotes = []; // the stack of actively-pressed keys

module.exports = function midiInit() {

	window.AudioContext=window.AudioContext||window.webkitAudioContext;

	app_context = new AudioContext();

	if (navigator.requestMIDIAccess) {
		navigator.requestMIDIAccess().then( device, reject );
	} else {
		$('#main').append('<div class="error">No MIDI support present in your browser. Function Reference: init</div>');
	}
}
