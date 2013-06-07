define("sourcekit/fileutil", function() {

var FileUtil = {
    basename: function(path) {
        return path.replace(/\\/g,'/').replace( /.*\//, '' );
    },
    
    uniqueIdByPath: function(path) {
        // TODO: BUG!! Use a hashing algorithm for this!
        return path.replace(/[ \/\.]/g, '_');
    },

    fileExtension: function(path) {
        var matched = [];
        if (matched = this.basename(path).match(/\.([^\.]*)$/)) {
            return matched[1];
        }
        
        return null;
    }
}

return FileUtil;

});