define('sourcekit/application', ['sourcekit/workspace'], function (Workspace) {

dojo.require("dijit.layout.ContentPane");
dojo.require("dijit.layout.BorderContainer");

var Application = {};

Application.start = function() {
    var workspace = Workspace.getDropboxWorkspace();
};

return Application;

});

