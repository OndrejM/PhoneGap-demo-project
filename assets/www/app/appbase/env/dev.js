define(['appbase/phonegap'], function(phonegap) {
	console.log('dev environment loaded');
	if (typeof device === 'undefined') {
		mockCordovaFeatures();
		phonegap.cordova.fireDocumentEvent('deviceready');
	}
	
	function mockCordovaFeatures() {
	    phonegap.cordova.exec = mockedCordovaExec; 		
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
	
});