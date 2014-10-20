'use strict';

var $ = require('jquery')(window),
    _ = require('underscore'),
    Backbone = require('backbone'),
    Note = require( './models/note.js' ),
    Notes = require( './collections/notes.js' ),
    NoteView = require( './views/noteView' ),
    notesCollection = new Notes(),

    // Main
    context=null,
    midiAccess=null,
    activeNotes = []; // the stack of actively-pressed keys

Backbone.$ = $;

function MIDIMessageEventHandler(event) {
    var code = event.data[1];
    // Switch to hide lower level midi events. Target what we need.
    switch (event.data[0] & 0xf0) {
    case 0x90:
        // note down event
        if (event.data[2]!==0) {
            if ( activeNotes.indexOf( code ) === -1 ) {
                var note = new Note({
                    timeOn:    event.timeStamp,
                    type:      event.data[0],
                    key:       event.data[1],
                    pressure:  event.data[2],
                    live:      true,
                });
                notesCollection.add( note );
                activeNotes.push( code );
            }
            return;
        }
    case 0x80:
        var offNote = notesCollection.filter( function(thing) {
              if ( thing.get("key") === event.data[1] && thing.get("live") === true ) {
                  thing.set("live", false );
                  thing.set("timeOff", event.timeStamp );
                  return thing;
              }
        });
        //offNote.forEach( function() { console.log(this) });
        console.log(_.last(offNote));
        // note off event
        if ( activeNotes.indexOf( code ) !== -1 ) {
            activeNotes.splice( activeNotes.indexOf( code ), 1 );
        }
        return;
    case 0xB0:
        // pedal event
        return;
    }
}

// Initialize the base MIDI function
function onMIDIInit(midi) {
    midiAccess = midi;
    if ((typeof(midiAccess.inputs) === 'function')) {
        var inputs=midiAccess.inputs();
        if (inputs.length === 0) {
            console.log('No MIDI input devices present. Function Reference: onMIDIInit');
        } else {
            for (var i=0;i<inputs.length;i++) {
                inputs[i].onmidimessage = MIDIMessageEventHandler;
            }
        }
    } else {

        // new MIDIMap not present in Chrome 38.0.2125.101
        var haveAtLeastOneDevice=false;
        var inputs=midiAccess.inputs.values();
        for ( var input = inputs.next(); input && !input.done; input = inputs.next()) {
            input.value.onmidimessage = MIDIMessageEventHandler;
            haveAtLeastOneDevice = true;
        }
        if (!haveAtLeastOneDevice) {
            console.log('No MIDI input devices present. Function Reference: onMIDIInit.2');
        }
    }
}

// Display fail function
function onMIDIReject(err) {
    console.log(err);
    console.log('The MIDI system failed to start. Function Reference: onMIDIReject');
}

window.addEventListener('load', function() {
    // patch up prefixes
    window.AudioContext=window.AudioContext||window.webkitAudioContext;

    context = new AudioContext();
    if (navigator.requestMIDIAccess) {
        navigator.requestMIDIAccess().then( onMIDIInit, onMIDIReject );
    } else {
        console.log('No MIDI support present in your browser. Function Reference: init');
    }
});
