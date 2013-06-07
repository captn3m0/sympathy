define("sourcekit/filelist", 
        ["sourcekit/notification"], 
        function(Notification) {

dojo.require("dijit.Tree");
dojo.require("dijit.form.Button");
dojo.require("dijit.form.DropDownButton");
dojo.require("dijit.Dialog");
dojo.require("dijit.TooltipDialog");
dojo.require("dijit.Toolbar");
dojo.require("dijit.MenuBar");
dojo.require("dijit.Menu");
dojo.require("dijit.MenuItem");

var FileList = function(store, editor) {
    this.store = store;
    this.editor = editor;
    this.fileNodeInContext = null;
    
    dojo.addOnLoad(this.setupInterface.bind(this));
};

FileList.prototype.setupInterface = function() {
    this.treeModel = new dijit.tree.TreeStoreModel({
        store: this.store,
        root: { label: this.store.getName(), path: '/', root: true, children: [] },
        childrenAttrs: ["children"],
        deferItemLoadingUntilExpand: true,
    });

    // Set up the Tree view and hook up events
    this.fileListTree = new dijit.Tree({
        model: this.treeModel, 
        //showRoot: false,
        openOnClick: true
    }, "fileListTree");
    
    dojo.connect(this.fileListTree, "onClick", this, function(item, node, event) {
        this.store.loadItem({
            item: item,
            onItem: (function(item) {
                this.editor.openFile(item);
            }).bind(this)
        });
    });
    
    this.fileListContextMenu = new dijit.Menu({
       targetNodeIds: ["fileListTree"]
    });
    
    // New File Context Menu and Dialog
    this.fileListContextMenu.addChild(new dijit.MenuItem({
        iconClass: "dijitEditorIcon dijitEditorIconNewPage",
        label: "New File...",
        onClick: (function() {
            var fileName = prompt("Enter a new file name");
            
            if (fileName != null) {
                var parentItem = null;
            
                if (this.fileNodeInContext.item.is_dir) {
                    parentItem = this.fileNodeInContext.item;
                } else if (this.fileNodeInContext.getParent() != null) {
                    parentItem = this.fileNodeInContext.getParent().item;
                } else {
                    parentItem = this.treeModel.root;
                }
            
                var item = { path: (parentItem.path + "/" + fileName).replace(/\/+/g, '/') };
        
                this.newFile(item, parentItem);
            }
        }).bind(this)
    }));
    
    // New Folder Context Menu and Dialog
    this.fileListContextMenu.addChild(new dijit.MenuItem({
        iconClass: "dijitIconFolderClosed",
        label: "New Folder...",
        onClick: (function() {
            var folderName = prompt("Enter a new folder name");
            
            if (folderName != null) {
                var parentItem = null;
            
                if (this.fileNodeInContext.item.is_dir) {
                    parentItem = this.fileNodeInContext.item;
                } else if (this.fileNodeInContext.getParent() != null) {
                    parentItem = this.fileNodeInContext.getParent().item;
                } else {
                    parentItem = this.treeModel.root;
                }
            
                var item = { path: (parentItem.path + "/" + folderName).replace(/\/+/g, '/'), is_dir: true, children: [] };
        
                this.newFolder(item, parentItem);
            }
        }).bind(this)
    }));
    
    // Delete Context Menu and Dialog
    this.fileListContextMenu.addChild(new dijit.MenuItem({
        iconClass: "dijitIconDelete",
        label: "Delete",
        onClick: (function() {
            if (confirm("Are you sure you want to delete this?")) {
                this.deletePath(this.fileNodeInContext.item);
            }
        }).bind(this)
    }));
    
    // Handle on open event of context menu to record the node being selected in FileListTree
    dojo.connect(this.fileListContextMenu, "_openMyself", this, function(e) {
        var tn = dijit.getEnclosingWidget(e.target);
        this.fileNodeInContext = tn;
    });
    
    // Set up notification
    dojo.connect(this.treeModel, "onNewItem", this, function(item, parentInfo) {
        this.fileListTree.set('selectedItem', item);
        Notification.notify('/resources/images/check.png', 'SourceKit Notification', 'New file created: ' + item.path);
    });
    
    dojo.connect(this.treeModel, "onDeleteItem", this, function(deletedItem) {
        Notification.notify('/resources/images/check.png', 'SourceKit Notification', 'Deleted: ' + deletedItem.path);
    });
}

FileList.prototype.newFile = function(item, parentItem) {
    this.treeModel.store.newItem(item, { parent: parentItem, attribute: 'children' });
}

FileList.prototype.newFolder = function(item, parentItem) {
    this.treeModel.store.newItem(item, { parent: parentItem, attribute: 'children' });
}

FileList.prototype.deletePath = function(item) {
    this.treeModel.store.deleteItem(item);
}

return FileList;

});
