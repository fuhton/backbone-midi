// midi : event
'use strict';

var _ = require('underscore');
var Note = require( '../models/note.js' );
var Notes = require( '../collections/notes.js' );

var notesCollection = new Notes();

module.exports = function midiEvent(event) {

	var midi_event = event;
	// Switch to hide lower level midi events. Target what we need.
	switch (event.data[0] & 0xf0) {
	case 0x90:
		// note down event
		var note = new Note({
			_id: window.app_midi.app_id,
			note: {
				note: midi_event,
			}
		}, { patch: true });
		note.save();

		return;
	case 0x80:
		// note up event
		return;
	case 0xB0:
		// pedal event
		return;
	}
}
