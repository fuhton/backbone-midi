// midi : device
'use strict';

var $ = require('jquery');
var midiEvent = require('./event');

module.exports = function midiDevice(midi) {

	app_midiAccess = midi;

	if ((typeof(app_midiAccess.inputs) === 'function')) {
		var inputs=app_midiAccess.inputs();
		if (inputs.length === 0) {
			$('#main').remove('.error');
			$('#main').append('<div class="error">No MIDI support present in your browser. Function Reference: device.1</div>');
		} else {
			for (var i=0;i<inputs.length;i++) {
				inputs[i].onmidimessage = midiEvent;
			}
		}

	} else {

		// new MIDIMap not present in Chrome 38.0.2125.101
		var haveAtLeastOneDevice=false;
		var inputs=app_midiAccess.inputs.values();
		for ( var input = inputs.next(); input && !input.done; input = inputs.next()) {
			input.value.onmidimessage = midiEvent;
			haveAtLeastOneDevice = true;
		}
		if (!haveAtLeastOneDevice) {
			$('#main').remove('.error');
			$('#main').append('<div class="error">No MIDI support present in your browser. Function Reference: device.2</div>');
		}
	}

}
