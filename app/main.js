require.config({
  paths: {
    jquery: 'libs/jquery/jquery-min',
    underscore: 'libs/underscore/underscore-min',
    backbone: 'libs/backbone/backbone-optamd3-min',
    text: 'libs/require/text',
    codemirror:'libs/codemirror/codemirror-require'
  }
});

require(['views/app'], function(AppView){
  var app_view = new AppView;
});
