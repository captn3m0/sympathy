var Sympathy = {
  init: function () {
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
    _.extend(CodeMirror.commands, {
      save: function (cm) {
        Sympathy.save(cm.getValue());
      },
      autocomplete: function (cm) {
        CodeMirror.simpleHint(cm, CodeMirror.javascriptHint);
      }
    });
    this.cm = CodeMirror(document.getElementById('editor'), {
      lineNumbers: true,
      theme: "eclipse",
      onCursorActivity: function () {
        Sympathy.cm.matchHighlight("CodeMirror-matchhighlight");
      },
      extraKeys: {
        "Ctrl-Space": "autocomplete",
        "Ctrl-H":"replace",
        "Ctrl-L":'goto'
      },
      autoClearEmptyLines: true,
      autofocus:true
    });
    /**
     * Now we look for a hash in the url
     */
    var locationInHash = location.hash.substr(1);
    if (locationInHash.length > 1) {
      this.load(location.hash.substr(1));
    } else {
      var path = prompt("Enter a file/directory path");
      this.load(path);
    }
  },
  loadDir: function (dir) {
    this.dir = dir;
    //We load the directory here
    var fileList = this.fs.listFiles(dir);
    var html = '';
    for (i in fileList)
    html += '<li class="' + fileList[i].type + '"><a target="_blank" href="#' + dir + "/" + fileList[i].name + '">' + fileList[i].name + '</a></li>';
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
    document.getElementsByTagName('title')[0].innerHTML = pathComponents[pathComponents.length - 1];

    /** Load the current directory as well */
    this.loadDir(this.getContainingDirectory(path));
  },
  save: function (v) {
    var filename = this.filename;
    this.fs.removeFile(filename);
    this.fs.saveTextFile(filename, v);
    return false;
  },
  filenameToMode: function (filename) {
    var path = filename.split('.');
    var extension = path[path.length - 1];
    return {
      "js": 'javascript',
      'html': 'htmlmixed',
      'css': 'css',
      'c': 'clike',
      'cpp': 'clike',
      'mkd': 'markdown',
      'md': 'markdown',
      'php': 'php',
      'py': 'python',
      'rb': 'ruby',
      'sh': 'shell',
      'xml': 'xml',
      'less': 'less',
      'sql': 'mysql',
      'json': {
        "name":'javascript',
        "json":true
      },
      'yaml': 'yaml',
      'r': 'r'
    }[extension];

  },
  getContainingDirectory: function (filename) {
    var path = filename.split(this.pathSeparator);
    return path.splice(0, path.length - 1).join(this.pathSeparator);
  }
}
