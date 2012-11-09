// Load the widget parser and mobile base
require({
		'environment': 'dev',
		'loadjs' : {
			'cordova/ext/nonAMD/barcodescanner.js' : {
				exports : 'window.plugins.barcodeScanner',
				init : function() {
					console.log('barcodescanner init');
				}
			},
			'jquery/nonAMD/jquery.js' : {
				exports : 'window.jQuery',
				init : function() {
					console.log('jQuery init');
				}
			},
			'jquery/nonAMD/jqMobi.js' : {
				exports : 'window.jq',
				init : function() {
					console.log('jqMobi init');
				}
			}
		}
	}, [ "appbase/app", "dojox/mobile/parser", "appbase/loadjs!jquery/nonAMD/jquery.js", "dijit/registry",
		"appbase/globals", "appbase/loadjs!cordova/ext/nonAMD/barcodescanner.js",
		"dojox/mobile/deviceTheme", "dojox/mobile/compat", "dojox/mobile",
		"dojo/domReady!", "dojox/mobile/bookmarkable", "appbase/htmlMixins" ], 
	function(app, parser, $, $w, g, barcodeScanner) {

	app.runAfterLoad(function() {
		// Parse the page for widgets!
		parser.parse();

		console.log('app.start');
		var scan = {
			$msg : $('#scanMessage'),
			$text : $('#scanText'),
			$fmt : $('#scanFormat')
		};
		
		initializeScanElems(scan);
		attachEventHandlers(scan);
	});

	app.start();

	function initializeScanElems(scan) {
		for (p in scan) {
			var $e = scan[p];
			if (scan.hasOwnProperty(p) && g.isDefined($e)) {
				$e.outputText = function (text) {
					if (this.length == 0) {
						return "";
					} else {
						if (!g.isDefined(text)) {
							return this.find('.value').text();
						} else {
							return this.find('.value').text(text);
						}
					}
				};
				if ($e.length > 0) {
					if ($e.outputText().length === 0) {
						$e.add(getListItemHeader($e)).hide();
					}
				}
			}
		}
	}
	
	function attachEventHandlers(scan) {
		$w.byId('butScan').on("click", function() {
			console.log('butScan clicked, this = ' + this);
			setMessage('Scanning code...', 'Initializing camera...')
			var handle = $w.byId('message').on("afterTransitionIn", function() {
				handle.remove();

				barcodeScanner.scan(function(result) {
					if (result.cancelled) {
						scan.$msg.outputText('$$.scan.cancelled');
					} else {
						scan.$msg.outputText('$$.scan.ok');
						scan.$text.outputText(result.text);
						scan.$fmt.outputText(result.format);
					}
					for (p in scan) {
						var e = scan[p];
						if (e.outputText().length > 0) {
							e.show();
						}
					}
				}, function(error) {
					scan.$msg.text('$$.scan.failed' + error).show();
				});

				if (app.isDev) {
					setTimeout(function() {
						history.back();
					}, 3000);	
				} else {
					history.back();
				}
			});

//			this.transitionTo('#message');
		});
		
	}

		
	function getListItemHeader($e) {
		var $result = $();
		$e.each(function(i, node) {
			var prev = node.prevElem();
			if (prev) {
				var widget = $w.byNode(prev);
				if (widget && widget.declaredClass === 'dojox.mobile.ListItem' && widget.header) {
					$result.add($(prev));
				}
			}
		})
		return $result;
	}
	
	function setMessage(title, text) {
		var $root = $('#message');
		$root.find('h1 .value').text(title);
		$root.find('.messageTextItem .value').text(text);
	}
	
});