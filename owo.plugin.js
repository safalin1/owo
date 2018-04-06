//META{"name":"oWo"}*//

var oWo = function () {};

oWo.isRunning = false;

oWo.prototype.cats = function(node) {
	if (node.nodeName.toLowerCase() == 'input' || node.nodeName.toLowerCase() == 'textarea')) { 
		return; 
	}

	var ignore = {
		"IFRAME": 0, 
		"NOSCRIPT": 0, 
		"OBJECT": 0
		"STYLE": 0, 
		"SCRIPT": 0 
	};
	
	if (node.tagName in ignore) {
		return;
	}
	
	var child;
	var next;
	
	switch (node.nodeType) {
		case 1:  
		case 9:  
		case 11: 
			child = node.firstChild;
			while (child) {
				next = child.nextSibling;
				oWo.prototype.cats(child);
				child = next;
			}
			break;

		case 3: 
			oWo.prototype.kitty(node);
			break;
	}
};

oWo.prototype.kitty = function (textNode) {
	var faces = [
		"(・`ω´・)",
		";;w;;",
		"owo",
		"UwU",
		">w<",
		"^w^"
	];
	
	var v = textNode.nodeValue;

	v = v.replace(/(?:r|l)/g, "w");
	
	v = v.replace(/(?:R|L)/g, "W");
	
	v = v.replace(/n([aeiou])/g, 'ny$1');
	
	v = v.replace(/N([aeiou])/g, 'Ny$1');
	
	v = v.replace(/N([AEIOU])/g, 'Ny$1');
	
	v = v.replace(/ove/g, "uv");
	
	v = v.replace(/\!+/g, " "+ faces[Math.floor(Math.random()*faces.length)]+ " ");
	
	textNode.nodeValue = v;
}

oWo.prototype.start = function () {
	var observerConfig = {
		attributes: true, 
		childList: true, 
		characterData: true,
		subtree: true
	};

	var targetNode = document.body;
	oWo.observer.observe(targetNode, observerConfig);
	oWo.isRunning = true;
};

oWo.prototype.stop = function () {
	oWo.observer.disconnect();
	oWo.isRunning = false;
};

oWo.prototype.load = function () {
	oWo.observer = new MutationObserver(function(mutations) {
		mutations.forEach(function(mutation) {
			oWo.prototype.cats(document.body);
		});    
	});
};

oWo.prototype.onMessage = function () {
	if (oWo.isRunning) {
		oWo.prototype.cats(document.body);
	}
};

oWo.prototype.onSwitch = function () {
	if (oWo.isRunning) {
		oWo.prototype.cats(document.body);
	}
};

oWo.prototype.unload = function () {};

oWo.prototype.getSettingsPanel = function () { 
	return ""; 
};

oWo.prototype.getName = function () {
    return "oWo";
};

oWo.prototype.getDescription = function () {
    return "Wuts this?";
};

oWo.prototype.getVersion = function () {
    return "1.1";
};

oWo.prototype.getAuthor = function () {
    return "Ported for BD by Stevu, original by leafysweetsgarden";
};