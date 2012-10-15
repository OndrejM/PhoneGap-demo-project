var requirejs = {
	waitSeconds : 60,
	// By default load any module IDs from lib
	baseUrl : 'lib',
	// except, if the module ID starts with "app",
	// load it from the js/app directory. paths
	// config is relative to the baseUrl, and
	// never includes a ".js" extension since
	// the paths config could be for a directory.
	paths : {
		app : '../app'
	},
	map : {
		'*' : {
			'jquery' : 'jquery-1.8.2',
			'jquery.mobile' : 'jquery.mobile-1.1.1'
		}
	},
	shim: {
		'jquery-1.8.2' : {
			exports: 'jQuery'
		},
		'app' : {
			deps: ['jquery'],
			exports: 'app'
		}
	}
};