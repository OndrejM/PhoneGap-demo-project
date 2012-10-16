// using requirejs v 2.1.1

var requirejs = {
	waitSeconds : 60,
	// avoid browser cache - for development
//	urlArgs: "bust=" +  (new Date()).getTime(),
	// By default load any module IDs from lib
	baseUrl : 'lib',
	// except, if the module ID starts with "app",
	// load it from the js/app directory. paths
	// config is relative to the baseUrl, and
	// never includes a ".js" extension since
	// the paths config could be for a directory.
	paths : {
		app : '../app',
		style : '../css',
		nls: '../nls'
	},
	map : {
		'*' : {
//			'cordova' : 'cordova-2.1.0',
			'jquery' : 'jquery-1.8.2',
			'jquery.mobile' : 'jquery.mobile-1.1.1',
			'css': 'require-css/css'
		}
	},
	shim: {
		'jquery-1.8.2' : {
			exports: 'jQuery',
			init: function() {
				console.log('jquery init');
			}
		},
		'jquery.mobile-1.1.1' : {
			exports: 'jQuery.mobile',
			deps: ['jquery', 'jquery.mobile-settings'],
			init: function() {
				console.log('jquery.mobile init');
			}
		},
		
		'barcodescanner' : {
			exports: 'window.plugins.barcodeScanner',
			init: function() {
				console.log('barcodescanner init');
			}
		}
	},
	requireCss: {
		alwaysInjectUsingLink: true
	}
};