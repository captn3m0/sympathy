define([
  'jquery',
  'underscore', 
  'backbone',
  'codemirror'
  ], function($, _, Backbone, CodeMirror){
  var AppView = Backbone.View.extend({

    // Instead of generating a new element, bind to the existing skeleton of
    // the App already present in the HTML.
    el: $("#container"),
  });
  return AppView;
});
