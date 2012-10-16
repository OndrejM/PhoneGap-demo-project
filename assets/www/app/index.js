requirejs([ 'app', 'jquery.mobile', 'barcodescanner' ],
	function(app, jqueryMobileModule, barcodeScanner) {

	app.start(function() {
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
					scan.msg.outputText('Scan cancelled');
				} else {
					scan.msg.outputText('We got a barcode');
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
				scan.msg.text("Scanning failed: " + error).show();
			});
		});
	});

});
