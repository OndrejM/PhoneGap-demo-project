// after module loads, call app.start(...) to run the application code after all environment is initialized
// app.start(...) executes callback after all is loaded, similarly to jQuery('document').ready(...)

define(['jquery', 'jquery.mobile', "i18n!nls/labels"], function(jQuery, jQueryMobile, labels) {
	
	var $ = jQuery;

	function App() {
		var app = this;
		
		var priv = {
			initialize : function() {
			},
			loadApp : function() {
				app.show();
				jQueryMobile.initializePage();
				for (callback in this.afterLoadCallbacks) {
					callback();
				}
			},
			afterLoadCallbacks : []
		};
		
		this.start = function(callback) {

			function onDeviceReady() {
				priv.initialize();
				callback();
				priv.loadApp();
			}
			
			if (typeof device !== 'undefined') {
				document.addEventListener("deviceready", onDeviceReady, false);
			} else {
				$(document).ready(function() {
					if (typeof mockCordovaFeatures === 'function') {
						console.log('Mocking phonegap features...');
						mockCordovaFeatures();
					} else {
						console.log('Mocking turned off, phonegap features will be missing...');			
					}
					//setTimeout(onDeviceReady, 5000);
					onDeviceReady();
				});
			}
		}
		
		this.show = function() {
			$('body').show();
		};
		
		this.runAfterLoad = function(callback) {
			priv.afterLoadCallbacks[priv.afterLoadCallbacks] = callback;
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
	}
	
	function mockedCordovaExec(successCallback, errorCallback, service, action, arguments) {
		var callbackExecuted = false;
		function returnSuccess(params) {
			successCallback(params);
			callbackExecuted = true;
		}
		function returnError(params) {
			errorCallback(params);
			callbackExecuted = true;
		}
		if (service === 'BarcodeScanner') {
			if (action === 'scan') {
				returnSuccess({
					text : "Text in code",
					format : "Mocked scan",
					cancelled : false
				});
			}
		}
		if (!callbackExecuted) {
			errorCallback();
		}
	}
	
	function mockCordovaFeatures() {
	    cordova.exec = mockedCordovaExec; 		
	}
	
	return new App();
				
});