var config = {
    baseUrl: "/src"
}

var deps = [
    "sourcekit/application",
    "pilot/plugin_manager",
    "pilot/settings",
    "pilot/environment"    
];

var plugins = [
    "pilot/index",
    "cockpit/index",
    "ace/defaults"
];

require(config, deps, function(Application) {
    var catalog = require("pilot/plugin_manager").catalog;

    catalog.registerPlugins(plugins).then(function() {
        var env = require("pilot/environment").create();
        catalog.startupPlugins({ env: env }).then(function() {
            require("sourcekit/application").start();
        });
    });
});