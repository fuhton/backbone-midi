// view : noteView

var NoteView = Backbone.View.extend({
   el: document,

   events: {
      "keydown": "logKey",
      'keyup': 'logKey',
      'keypress': 'logKey'
   },

   logKey: function(e) {
      console.log(e.type, e.keyCode);
   }
});

var note_view = new NoteView();
