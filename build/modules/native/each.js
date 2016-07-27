var generateCheckLoops = (first, second) => {
		return (object, funct, optional, rawProp) => {
			var returned;
			if (!hasValue(object)) {
				return False;
			} else if (isArray(object)) {
				returned = first;
			} else if (isPlainObject(object) || isFunction(object)) {
				returned = second;
			} else {
				if (rawProp) {
					returned = mapProperty;
				} else if (object.forEach) {
					returned = forEach;
				} else {
					returned = second;
				}
			}
			return returned(object, funct, optional);
		};
	},
	map = $.map = generateCheckLoops(mapArray, mapObject),
	each = $.each = generateCheckLoops(eachArray, eachObject),
	filter = $.filter = function (object, funct, safeMode) {
		var returned;
		if (!hasValue(object)) {
			return False;
		} else if (isArray(object)) {
			returned = filterArray;
		} else if (isPlainObject(object) || isFunction(object)) {
			returned = filterObject;
		}
		return returned(object, funct, safeMode);
	};
