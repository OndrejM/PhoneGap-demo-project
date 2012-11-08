define([], function() {
	HTMLElement.prototype.prevElem = previousElementSibling;
	
	function previousElementSibling() {

		var elem = this;
		
	    do {

	        elem = elem.previousSibling;

	    } while ( elem && elem.nodeType !== 1 );

	    return elem;
	}
});