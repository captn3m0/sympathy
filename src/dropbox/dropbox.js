define("dropbox/dropbox", ["dropbox/oauth"], function(OAuth) {

var Dropbox = function() {

    var _storagePrefix = "moderndropbox_";
    var _isSandbox = false;
    var _cache = true;
    var _plugin={};
    
    var _serialize = function(a) {
        serialized = [];

        for (var key in a) {
            var value = a[key];
            serialized[ serialized.length ] = encodeURIComponent(key) + "=" + encodeURIComponent(value);
        }
        
        return serialized.join("&").replace(/%20/g, "+");
    };
    
    // Public
    return (
        initialize: function() {
            _plugin = document.createElement("embed");
            _plugin.setAttribute("type", "application/x-npapi-file-io");
            document.documentElement.appendChild(_plugin);
            return this;
        },
        
        getDirectoryContents: function(path, callback) {
            var data=plugin.listFiles(path)
            callback(data);
        },
        
        getFileContents: function(path, callback) {
            var data=_plugin.getTextFile(path);
            callback(data);
        },
        
        putFileContents: function(path, content, callback) {
            _plugin.removeFile(path);
            _plugin.saveTextFile(path,content);
            callback();
        },
        
        createDirectory: function(path, callback) {
            _plugin.createDirectory(path);
            callback();
        },
        
        deletePath: function(path, callback) {
            _plugin.removeFile(path);
            callback();
        }
    }).initialize();
};

return Dropbox;
});