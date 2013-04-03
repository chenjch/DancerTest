function $(id) {
	return document.getElementById(id);
}

String.prototype.trim = function() {
	return this.replace( /(^\s*)|(\s*$)/g, '');
}
	
function asynPost( uri, queryString, successCallBackHandler ) {
	var req = createRequest();
	
	req.open('POST', uri, true);
		
	req.setRequestHeader("Method", "POST " + uri + " HTTP/1.1");
	req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	
	req.onreadystatechange = function() {
		
		if (req.readyState == 4) {
			if (req.status == 200) {
				successCallBackHandler(req.responseText);
			}
		}
	}
	
	req.send(queryString);
}

function createRequest() {
	if (window.XMLHttpRequest) {
		return new XMLHttpRequest;
	}
	else
		if (window.ActiveXObject) {
		 	var req;
		 	try {
		 		req = new ActiveXObject("Msxml2.XMLHTTP");
		 	}
		 	catch (e) {
		 		try {
		 			req = new ActiveXObject("Microsoft.XMLHTTP");
		 		} 
		 		catch (e) {
		 			return null;
		 		}
		 	}
		 	return req;
		 }
		 else 
		 	return null;
}

function buildMultiParamString ( paramName, checkBoxName ) {
	
	var check_boxs = document.getElementsByName(checkBoxName);
	
	var item = [];
	for ( var i = 0; i < check_boxs.length; i++ ) {
		if ( check_boxs[i].checked ) {
			item.push( paramName + '=' + check_boxs[i].value )
		}
	}
	
	return item.join('&');
}

function checkAll( clickObj, checkBoxName ) {
	var check_boxs = document.getElementsByName(checkBoxName);
	var value = clickObj.checked;
	
	for ( var i = 0; i < check_boxs.length; i++ ) {
		check_boxs[i].checked = value;
	}
}

