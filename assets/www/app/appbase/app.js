// after module loads, call app.start(...) to run the application code after all environment is initialized
// app.start(...) executes callback after all is loaded, similarly to jQuery('document').ready(...)

define(['appbase/phonegap', 'appbase/env/envLoad', "dojo/i18n!nls/labels"], 
		function(phoneGap, env, labels) {
	
	function App() {
		var app = this;
		
		var priv = {
			initialize : function() {
			},
			loadApp : function() {
				app.show();
				for (var cbkKey in this.afterLoadCallbacks) {
					this.afterLoadCallbacks[cbkKey]();
				}
			},
			afterLoadCallbacks : []
		};
		
		this.start = function(callback) {

			// BlackBerry OS 4 browser does not support events.
		    // So, manually wait until PhoneGap is available.
		    //
		    var intervalID = window.setInterval(
		      function() {
		          if (phoneGap.available) {
		              onDeviceReady();
		          }
		      },
		      500
		    );
		    document.addEventListener("deviceready", onDeviceReady, false);

			function onDeviceReady() {
				window.clearInterval(intervalID);
				priv.initialize();
				if (callback) {
					callback();
				}
				priv.loadApp();
			}

		}
		
		this.show = function() {
			document.getElementsByTagName('body')[0].style.display ='block';
		};
		
		this.runAfterLoad = function(callback) {
			priv.afterLoadCallbacks[priv.afterLoadCallbacks.length] = callback;
		};
		
		this.res = {
			labels : labels
		};			
		
		this.applyLabels = function() {
			$('.i18n').each(function(i, elem) {
				var $elem = $(elem);
				var labelKeys = $elem.text().trim().split('.');
				var label = app.res.labels;
				for (iKey in labelKeys) {
					label = label[labelKeys[iKey]];
				}
				$elem.text(label);
			});
		}
		
		this.env = env;
		
		this.isDev = (this.env == 'dev');
		this.isProd = (this.env == 'prod');
	}
	
	return new App();
				
});