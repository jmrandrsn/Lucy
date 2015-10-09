//raw URL encode
var _rawURLDecode = function (string) {
	return decodeURIComponent((string + '').replace(rawURLDecode_regex, function () {
		return '%25';
	}));
};
$.rawURLDecode = _rawURLDecode;
//html entities
var _htmlEntities = function (string) {
	return string.replace(and_regex, '&amp;').replace(less_than_regex, '&lt;').replace(more_than_regex, '&gt;').replace(double_quote_regex, '&quot;').replace(slash_regex, '&quot;');
};
$.htmlEntities = _htmlEntities;
//decode then htmlentities
$.sanitize = function (string) {
	return _htmlEntities(_rawURLDecode(string));
};
//decode URI Component
$.duc = function () {
	return decodeURIComponent(this);
};
//encode URI Component
$.euc = function () {
	return encodeURIComponent(this);
};
