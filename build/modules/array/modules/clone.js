/**
 * Creates a shallow copy of the array.
 *
 * @function Array#clone
 * @returns {Array} A clone of the array.
 *
 * @example
 * var a = [1, 2, 3];
 * var b = a.clone();
 * console.log(b, b === a);
 * // -> [1, 2, 3] False
 */
var cloneArray = $.cloneArray = arraySliceCall;
