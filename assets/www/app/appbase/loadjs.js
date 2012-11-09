/**
 * Usage: require([ 'loadjs!pathToScript.js' ]) - where pathToScript.js is path relative to dojo modules directory (baseUrl/..) directory
 * 
 * Config: dojoConfig {
 * 				'loadjs': {
 * 					'pathToScript.js': {
 * 						exports: 'window.globalObject',
 * 						init: function() {
 * 						}
 * 					}
 * 				}
 * 			}
 */

define(['dojo/_base/config', 'appbase/globals'], function(config, g) {
	return {
		load : function(id, require, callback) {
			var callbackCalled = false;
			if (!config.loadjs) {
				config.loadjs = {};
			}
			if (!config.loadjs[id]) {
				config.loadjs[id] = {};
			}
			var idConfig = config.loadjs[id];
			if (!idConfig._scriptLoaded) {
				require([config.baseUrl + "/../" + id], function() {
					if (idConfig) {
						if (idConfig.init && typeof idConfig.init === 'function') {
							idConfig.init();
						}
						if (idConfig.exports) {
							var exports = eval(idConfig.exports);
							if (g.isDefined(exports)) {
								callback(exports);
								callbackCalled = true;
							}
						}
					}
					if (!callbackCalled) {
						callback();
					}
				}); 
			}
		}
	};
});