require([ 'app', 'jquery.mobile', 'barcodescanner', 'css!style/jquery.mobile-fix' ],
	function(app, jqueryMobile, barcodeScanner) {

	app.runAfterLoad(function() {
		jqueryMobile.initializePage();
	});

	app.start(function() {
		console.log('app.start');
		var $$ = app.res.labels;
		app.applyLabels();
		var scan = {
			msg : $('#scanMessage'),
			text : $('#scanText'),
			fmt : $('#scanFormat')
		};
		function outputText(text) {
			if (typeof text === 'undefined') {
				return this.find('.output').text();
			}
			{
				return this.find('.output').text(text);
			}
		}
		for (p in scan) {
			var e = scan[p];
			e.outputText = outputText;
			if (e.outputText().length === 0) {
				e.hide();
			}
		}
		$('#butScan').click(function() {
			console.log('butScan clicked');
			for (p in scan) {
				var e = scan[p];
				e.hide();
			}
			barcodeScanner.scan(function(result) {
				if (result.cancelled) {
					scan.msg.outputText($$.scan.cancelled);
				} else {
					scan.msg.outputText($$.scan.ok);
					scan.text.outputText(result.text);
					scan.fmt.outputText(result.format);
				}
				for (p in scan) {
					var e = scan[p];
					if (e.outputText().length > 0) {
						e.show();
					}
				}
			}, function(error) {
				scan.msg.text($$.scan.failed + error).show();
			});
		});
	});

});
