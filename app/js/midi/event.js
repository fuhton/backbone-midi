// midi : event
'use strict';

var Note = require( '../models/note.js' );
var Notes = require( '../collections/notes.js' );

var notesCollection = new Notes();

module.exports = function midiEvent(event) {

	var code = event.data[1];
	// Switch to hide lower level midi events. Target what we need.
	switch (event.data[0] & 0xf0) {
	case 0x90:
		// note down event
		if (event.data[2]!==0) {
			if ( app_activeNotes.indexOf( code ) === -1 ) {
				var note = new Note();
				note.save();
				notesCollection.add( note );
				app_activeNotes.push( code );
			}
			return;
		}
	case 0x80:
		var offNote = notesCollection.filter( function(obj) {
			  if ( obj.get("key") === event.data[1] && obj.get("live") === true ) {
				  obj.set("live", false );
				  obj.set("timeOff", event.timeStamp );
				  return obj;
			  }
		});
		//offNote.forEach( function() { console.log(this) });
		console.log( _.last( offNote ) );
		// note off event
		if ( app_activeNotes.indexOf( code ) !== -1 ) {
			app_activeNotes.splice( app_activeNotes.indexOf( code ), 1 );
		}
		return;
	case 0xB0:
		// pedal event
		return;
	}
}
