define([], function() {
	return {
		isDefined: function(value) {
			return typeof value !== 'undefined'
		}
	};
});