/**
 * Config: dojoConfig {
 * 				'environment': prod|test|dev
 * 				}
 * 			}
 */

define(['dojo/_base/config', 'appbase/globals', 'require'], function(config, g, require) {
	if (config.environment) {
		require(['./' + config.environment])
	};
});