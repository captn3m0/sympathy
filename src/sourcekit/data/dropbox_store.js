define("sourcekit/data/dropbox_store", ['sourcekit/fileutil'], function(FileUtil) {

var DropboxStore = function(dropbox) {
    var _dropbox = dropbox;

    return {
		getName: function() { return "Dropbox"; },
        getValue: function(item, attribute, defaultValue) { 
            if (item[attribute]) {
                return attribute;
            } else if (attribute == "content") {
                return _dropbox.getFileContents(item.path);
            }
            
            return defaultValue;
        },
        getValues: function(item, attribute) {
            return (item[attribute] || []).slice(0); 
        },
        getAttributes: function(item) { console.log('Not Implemented Yet'); },
        hasAttribute: function(item, attribute) { 
            return item[attribute] != null;
        },
        containsValue: function(item, attribute, value) { console.log('Not Implemented Yet'); },
        isItem: function(something) { console.log('Not Implemented Yet'); },
        isItemLoaded: function(something) {            
            var result = false;
            
            if (something && something.loaded) {
                result = something.loaded;
            }
            
            return result;
        },
        loadItem: function(keywordArgs) {
            var scope = keywordArgs.scope || dojo.global;
            
            if (keywordArgs.item) {
                var item = keywordArgs.item;
                
                if (item.is_dir || item.root != null) {
                    _dropbox.getDirectoryContents(item.path, function(data) {
                        for (i in data.contents) {
                            if (data.contents[i].is_dir) {
                                data.contents[i].children = [];
                                data.contents[i].loaded = false;
                            } else {
                                data.contents[i].loaded = false;
                            }
                
                            item.children.push(data.contents[i]);
                        }
                    
                        item.loaded = true;
                        keywordArgs['onItem'].call(scope, item);
                    });
                } else if (!item.is_dir) {
                    _dropbox.getFileContents(item.path, function(data) {
                        item.loaded = true;
                        keywordArgs['onItem'].call(scope, item);
                    });
                }
            }
            
            return true;
        },
        
        // Initial Fetch
        fetch: function(keywordArgs) { 
            var path = keywordArgs.query.path;
            var scope = keywordArgs.scope || dojo.global;
            
            _dropbox.getDirectoryContents(path, function(data) {
                for (i in data.contents) {
                    if (data.contents[i].is_dir) {
                        data.contents[i].children = [];
                        data.contents[i].loaded = false;
                    } else {
                        // ??
                        data.contents[i].loaded = false;
                    }
                }
                
                if (keywordArgs.onBegin) { 
                    keywordArgs['onBegin'].call(scope, data.contents.length, keywordArgs) 
                }
                
                if (keywordArgs.onItem){
                    for (i in data.contents){	
                        keywordArgs["onItem"].call(scope, data.contents[i], keywordArgs);
                    }
                    if (keywordArgs.onComplete) {
                        keywordArgs["onComplete"].call(scope, keywordArgs);
                    }
                } else if (keywordArgs.onComplete){
                    keywordArgs["onComplete"].call(scope, data.contents, keywordArgs);
                }
            });
        },
        getFeatures: function() { 
            return {
                'dojo.data.api.Read':true, 
                'dojo.data.api.Identity':true, 
                'dojo.data.api.Write':true, 
                'dojo.data.api.Notification':true
            };
        },
        close: function(request) { console.log('Not Implemented Yet'); },
        getLabel: function(item) { 
            if (item.label) {
                return item.label;
            }
            
            return FileUtil.basename(item.path);
        },
        getLabelAttributes: function(item) { console.log('Not Implemented Yet'); },
        
        /* Identity API */
        getIdentity: function(item) { 
            return item.path;
        },
        getIdentityAttributes: function(/* item */ item) { console.log('Not Implemented Yet'); },
        fetchItemByIdentity: function(keywordArgs) { console.log('Not Implemented Yet'); },
        
        /* Write API */
        newItem: function(keywordArgs, parentInfo) {
            var item = keywordArgs;
            
            // Checking for dupes
            var children = parentInfo.parent[parentInfo.attribute];
            for (key in children) {
                if (children[key].path == item.path) {
                    return false;
                }
            }
            
            var onSuccess = (function() { 
                onNewParentInfo = {
                    item: parentInfo.parent,
                    attribute: parentInfo.attribute,
                    oldValue: null,
                    newValue: item
                };
            
                this.onNew(item, onNewParentInfo);
            }).bind(this);

            if (item.is_dir) {
                item.loaded = true;
                _dropbox.createDirectory(item.path, onSuccess);
            } else {
                item.loaded = true;
                _dropbox.putFileContents(item.path, "", onSuccess);
            }

            children.push(item);
            children.sort(function(a, b) { return a.path.toLowerCase() > b.path.toLowerCase() ? 1 : -1 });
            
            return item;
        },
        
        deleteItem: function(item) {
            var onSuccess = (function() {
                this.onDelete(item);
            }).bind(this);
            
            _dropbox.deletePath(item.path, onSuccess);
            
            return item;
        },
        
        setValue: function(item, attribute, value) {
            var oldValue = null;
            if (item[attribute]) {
                oldValue = item[attribute];
            }
            
            item[attribute] = value;
            
            if (attribute == "content") {
                _dropbox.putFileContents(item.path, value, (function() {
                    this.onSet(item, attribute, oldValue, value);
                }).bind(this));
            }
        },
        
        setValues: function(item, attribute, values) {
            item[attribute] = values;
        },
        
        unsetAttribute: function(/* item */ item, /* string */ attribute) {
            console.log('Not implemented yet');
        },
        
        save: function(keywordArgs) {
            console.log('Not implemented yet');
        },
        
        revert: function() {
            console.log('Not implemented yet');
        },
        
        isDirty: function(/* item? */ item) {
            console.log('Not implemented yet');
        },
        
        /* Notification API */
        onSet: function(item, attribute, oldValue, newValue) { },

        onNew: function(newItem, parentInfo) { },

        onDelete: function(deletedItem) { }
    }
}

return DropboxStore;

});
