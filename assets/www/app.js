// defines global variable app and start only after cordova has been initialized
$(document).ready(function() {
	
	function App() {
	};
	
	if (typeof device !== 'undefined') {
		document.addEventListener("deviceready", onDeviceReady, false);
	} else {
		if (typeof mockCordovaFeatures === 'function') {
			console.log('Mocking phonegap features...');
			mockCordovaFeatures();
		} else {
			console.log('Mocking turned off, phonegap features will be missing...');			
		}
		onDeviceReady();
	}

	function onDeviceReady() {
		window.app = new App();
		$('body').show();
	};
	
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
	
});