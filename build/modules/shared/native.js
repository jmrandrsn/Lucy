/*

	Native objects

*/
var arrayNative = Array,
	objectNative = Object,
	functionNative = Function,
	stringNative = String,
	json = JSON,
	mathNative = Math,
	booleanNative = Boolean,
	undefinedNative = undefined,
	weakMap = WeakMap,
	mapNative = Map,
	numberNative = Number,
	regExp = RegExp,
	parseIntNative = parseInt,
	/*

		Prototypes

	*/
	prototypeString = 'prototype',
	objectPrototype = objectNative[prototypeString],
	arrayPrototype = arrayNative[prototypeString],
	stringPrototype = stringNative[prototypeString],
	functionPrototype = functionNative[prototypeString],
	regExpPrototype = regExp[prototypeString],
	/*
		Array.prototype Functions
	*/
	toArray = $.toArray = arrayNative.from.bind(arrayNative),
	/*
    	Object Functions
    */
	objectKeys = $.keys = objectNative.keys,
	objectIs = $.is = objectNative.is,
	objectAssign = $.assign = objectNative.assign,
	getOwnPropertyDescriptor = $.getPropDescrip = objectNative.getOwnPropertyDescriptor,
	defineProperty = $.defineProperty = objectNative.defineProperty,
	getOwnPropertyNames = $.getOwnPropertyNames = objectNative.getOwnPropertyNames,
	/*
		Boolean
	*/
	False = false,
	True = true,
	/*
		JSON
	*/
	stringify = json.stringify,
	jsonParse = json.parse;
