// after module loads, cass app.start(...) to run the application code after all environment is initialized
// app.start(...) executes callback after all is loaded, similarly to jQuery('document').ready(...)

define(['jquery'], function(jQuery) {
	
	var $ = jQuery;

	function App() {
		this.start = function(callback) {

			function onDeviceReady() {
				$('body').show();
				callback();
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