/** 
  * Goto extension for CodeMirror
  * Uses CodeMirror dialog
  */
(function(){
  function goto(cm,line){
    cm.setCursor(Number(line),0)
    cm.setSelection({line:Number(line)-1,ch:0},{line:Number(line),ch:0})
    cm.focus()
  }

  var queryDialog =
    'Goto: <input type="text" style="width: 3em"> <span style="color: #888">(Enter Line #)</span>';

  CodeMirror.commands.goto = function(cm) {
    cm.openDialog(queryDialog, function(query) {
      goto(cm,query)
    });
  };

})()