var Sympathy = {
  currentTheme:"neat",
  init: function () {
	$.ajaxSetup({
      context: Sympathy
    });
    /** Initialize NPAPI Plugin */
    this.fs = document.createElement("embed");
    this.fs.style.position = "absolute";
    this.fs.style.left = "-9999px";
    this.fs.setAttribute("type", "application/x-npapi-file-io");
    document.documentElement.appendChild(this.fs);
    this.pathSeparator = this.fs.getPlatform() == 'windows' ? "\\" : '/';

    /**Code Mirror stuff */
    _.extend(CodeMirror, {
      modeURL: "cm/mode/%N/%N.js"
    });
    /** Additional Commands **/
    _.extend(CodeMirror.commands, {
      save: function () {
        Sympathy.save(Sympathy.cm.getValue());
      },
      open: function(cm){
        var rootDir = (typeof Sympathy.dir !== 'undefined') ? "Relative to "+ Sympathy.dir : 'Type Absolute Path';
      var queryDialog =
    'Filename: <input type="text" style="width: 10em"> <span style="color: #888">('+rootDir+')</span>';
        cm.openDialog(queryDialog,function(filename){
          if(Sympathy.dir)
            filename = Sympathy.dir + Sympathy.pathSeparator + filename;
          Sympathy.loadFile(filename);
        });
        return false;
      },
      reload: Sympathy.reload,
      autocomplete: function (cm) {
        CodeMirror.simpleHint(cm, CodeMirror.javascriptHint);
      },
      cycleTheme: function(){
        //look for the currentTheme
        var index = Sympathy.themes.indexOf(Sympathy.currentTheme);
        var next = (index==Sympathy.themes.length-1) ? 0 : index+1;
        var themeName = Sympathy.themes[next]
        Sympathy.changeTheme(themeName);
      },
      duplicate: function(cm){
        if(cm.somethingSelected()){
          var selectionEndCursor = cm.getCursor(false);
          //if something is selected, replace it with twice its contents
          //and highlight the second half
          var selectedText = cm.getSelection();
          cm.replaceSelection(selectedText+selectedText);
          var finalSelectionEndCursor = cm.getCursor(false);
          cm.setSelection(selectionEndCursor,finalSelectionEndCursor);
        }
        else{
          var line = cm.getCursor().line
          var lineContents = cm.getLine(line);
          lineContents+="\n"+lineContents;
          cm.setLine(line,lineContents);
        }
      },
      newtab: function(cm,file){
        //create a new tab with the current folder browse mode
        if(typeof file !='undefined')
          var link = location.origin+location.pathname+'#'+file;
		else
          var link = location.origin+location.pathname+'#'+Sympathy.dir;
        window.open(link);
		return false;
      },
      opennewtab: function(cm){
		//ask for file name
		var rootDir = (typeof Sympathy.dir !== 'undefined') ? "Relative to "+ Sympathy.dir : 'Type Absolute Path';
		var queryDialog =
    'Filename: <input type="text" style="width: 10em"> <span style="color: #888">('+rootDir+') - Will open in new tab</span>';
        cm.openDialog(queryDialog,function(filename){
          if(Sympathy.dir)
            filename = Sympathy.dir + Sympathy.pathSeparator + filename;
          CodeMirror.commands.newtab(cm,filename)
        });
        return false;
      },
      openmanual: function(cm){
        var editor=cm;
        $.get('manual.mkd',function(text,a,b,c){
          this.cm.setValue(text);
          this.cm.setOption("mode", "markdown");
          CodeMirror.autoLoadMode(this.cm, "markdown");
          this.cm.notify("Try pressing Ctrl-S");
        });
        this.filename=this.dir=false;
        return false;
      }
    });

    /** Initialize CodeMirror */
    this.cm = CodeMirror(document.getElementById('editor'), {
      lineNumbers: true,
      theme: this.currentTheme,
      onCursorActivity: function () {
        Sympathy.cm.matchHighlight("CodeMirror-matchhighlight");
      },
      extraKeys: {
        "Ctrl-Space": "autocomplete",
        "Ctrl-H":"replace",
        "Ctrl-L":'goto',
        "Ctrl-R":"reload",
        "Ctrl-J":'goto',
        "F9":"cycleTheme",
        "Ctrl-D": "duplicate",
        "Ctrl-E":"newtab",
        "Ctrl-O":"open",
        "Shift-Ctrl-O":"opennewtab",
        "F1":"openmanual"
      },
      autoClearEmptyLines: true,
      autofocus:true
    });
    this.changeTheme(this.currentTheme,true);
    /**
     * Now we look for a hash in the url
     */
    var locationInHash = location.hash.substr(1);
    if (locationInHash.length > 1) {
      switch(locationInHash){
        case 'manual':
          //Load the user manual
          CodeMirror.commands.openmanual();
          break;
        default:
      	  this.load(locationInHash);
      }
    } else {
      var path = prompt("Enter a file/directory path");
      this.load(path);
    }
  },
  loadDir: function (dir) {
    this.dir = dir;
    //We load the directory here
    try{
      var fileList = this.fs.listFiles(dir);
    }
    catch(error){
      console.log(error);
      this.cm.notify("There was an error in loading the file list.");
      return true;
    }
    var html = '';
    for (i in fileList)
      html += '<li class="' + fileList[i].type + '"><span class="cm-property">' + fileList[i].name + '</span></li>';
    document.querySelector('#browser').innerHTML = html;
  },
  load: function (path) {
    if (this.fs.isDirectory(path)) this.loadDir(path);
    else this.loadFile(path);
  },
  loadFile: function (path) {
    this.filename = path;
    var fileContents = this.fs.getTextFile(path);
    this.cm.setValue(fileContents);
    var mode = this.filenameToMode(path);
    this.cm.setOption("mode", mode);
	CodeMirror.autoLoadMode(this.cm, mode);

    /** Set title of the page to filename */
    var pathComponents = path.split(this.pathSeparator);
    this.dir = this.getContainingDirectory(path);
    document.getElementsByTagName('title')[0].innerHTML = pathComponents[pathComponents.length - 1];

    /** Load the current directory as well */
    this.loadDir(this.dir);

    /** Set the location hash to the file as well, so it can be bookmarked **/
    document.location.hash = this.filename;
  },
  save: function (content) {
    var filename = Sympathy.filename;
    if(typeof filename == 'undefined'){
      //ask for the filename
      var rootDir = (typeof Sympathy !== 'undefined') ? "Relative to "+ Sympathy.dir : 'Type Absolute Path';
      var queryDialog =
    'Enter Filename: <input type="text" style="width: 10em"> <span style="color: #888">('+rootDir+')</span>';
      Sympathy.cm.openDialog(queryDialog, function(filename) {
        if(filename.length > 0){
          if(Sympathy.dir)
            Sympathy.filename = Sympathy.dir+Sympathy.pathSeparator+filename;
          //now we call save function again
          Sympathy.save(content)
          Sympathy.loadFile(Sympathy.filename);
        }
      });
    }
    else{
      	if(this.fs.fileExists(filename))
    		this.fs.removeFile(filename);
    	this.fs.saveTextFile(filename, content);
    }
    return false;
  },
  filenameToMode: function (filename) {
    var path = filename.split('.');
    if( path.length == 1) return 'markdown';
    var extension = path[path.length - 1];
    return {
      js: 'javascript',
      html: 'htmlmixed',
      css: 'css',
      c: 'clike',
      java:'clike',
      cs:'clike',
      h:'clike',
      cpp: {
        name:'clike',
        useCPP:true
      },
      mkd: 'markdown',
      md: 'markdown',
      php: 'php',
      py: 'python',
      rb: 'ruby',
      sh: 'shell',
      bashrc:'shell',
      xml: 'xml',
      less: 'less',
      sql: 'mysql',
      json: {
        name:'javascript',
        json:true
      },
      yaml: 'yaml',
      r: 'r'
    }[extension];

  },
  getContainingDirectory: function (filename) {
    var path = filename.split(this.pathSeparator);
    return path.splice(0, path.length - 1).join(this.pathSeparator);
  },
  changeTheme:function(theme,silent){
    //change the theme stylesheet
	document.getElementById('theme-style').setAttribute('href',"cm/theme/"+theme+".css");
    this.cm.setOption("theme", theme);
    document.body.setAttribute('class','cm-s-'+theme);
    Sympathy.currentTheme = theme;
    if(!silent)
    	Sympathy.cm.notify("Theme changed : "+theme);
  },
  reload:function(cm){
    //wish there was a function to check last modified time in npapi
    //could have used it here to display a warning @todo
    //get current cursor position
    var cursor = cm.getCursor();
    Sympathy.loadFile(Sympathy.filename);
    cm.setCursor(cursor);
  },
  /** List Of Themes **/
  themes:[
    "ambiance","blackboard","cobalt","eclipse","elegant","lesser-dark"
    ,"monokai","neat","night","rubyblue","solarized-dark","xq-dark"
  ]
}
