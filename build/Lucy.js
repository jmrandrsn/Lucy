(function(global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global.Lucy = factory());
}(this, (function() {
  'use strict';

  let cacheSuper;
  const acid$1 = (...args) => {
    return cacheSuper(...args);
  };
  acid$1.superMethod = (method) => {
    cacheSuper = method;
  };

  const objectNative$1 = Object;
  const keys = objectNative$1.keys;
  const is = objectNative$1.is;
  const assign = objectNative$1.assign;
  const getOwnPropertyDescriptor = objectNative$1.getOwnPropertyDescriptor;
  const defineProperty = objectNative$1.defineProperty;
  const getOwnPropertyNames = objectNative$1.getOwnPropertyNames;
  const objectSize = (thisObject) => {
    return keys(thisObject).length;
  };
  assign(acid$1, {
    keys,
    is,
    assign,
    getOwnPropertyDescriptor,
    defineProperty,
    getOwnPropertyNames,
    objectSize
  });

  /*
  const array = [async function(...args){
    console.log(1,args);
  }, async function(...args){
    console.log(2,args);
  }];
  acid.asyncEach(array,[3,4]);
  */
  const asyncEach = async(array, arg) => {
    const arrayLength = array.length;
    for (let index = 0; index < arrayLength; index++) {
      const item = array[index];
      await item(arg, index, arrayLength);
    }
  };
  assign(acid$1, {
    asyncEach,
  });

  const whileGenerator = (optBool) => {
    return (array, fnc) => {
      const arrayLength = array.length;
      for (let index = 0; index < arrayLength; index++) {
        if (fnc(array[index], index, array, arrayLength) !== optBool) {
          break;
        }
      }
    };
  };
  // loop through based on number


  const eachArrayRight = (array, fn) => {
    const arrayLength = array.length;
    for (let index = arrayLength - 1; index >= 0; index--) {
      fn(array[index], index, array, arrayLength);
    }
  };
  const eachArray = (array, fn) => {
    const arrayLength = array.length;
    for (let index = 0; index < arrayLength; index++) {
      fn(array[index], index, array, arrayLength);
    }
  };
  const generateMap = (method) => {
    return (array, fn) => {
      const results = [];
      method(array, (item, index, arrayOriginal, arrayLength) => {
        results[index] = fn(item, index, arrayOriginal, arrayLength, results);
      });
      return results;
    };
  };
  const filterArray = (array, fn) => {
    const results = [];
    let returned;
    eachArray(array, (item, index, arrayOriginal, arrayLength) => {
      returned = fn(item, index, arrayOriginal, arrayLength, results);
      if (hasValue(returned)) {
        results.push(returned);
      }
    });
    return results;
  };

  const mapArray = generateMap(eachArray);

  const eachWhile = whileGenerator(true);

  const objectStringGenerate = (objectName) => {
    return `[object ${objectName}]`;
  };
  const isUndefined = function(obj) {
    return obj === undefined;
  };
  const isNull = (obj) => {
    return obj === null;
  };
  const hasValue = (item) => {
    return !isUndefined(item) && !isNull(item);
  };
  const isSameObjectGenerator = (type) => {
    return (obj) => {
      return (hasValue(obj)) ? obj.toString() === type : false;
    };
  };
  const isConstructor = (nativeObject) => {
    return (obj) => {
      return (hasValue(obj)) ? obj.constructor === nativeObject : false;
    };
  };
  const decimalCheck = /\.|\+/;
  const isDecimal = (string) => {
    return string.toString().match(decimalCheck);
  };
  const isArray = Array.isArray;
  const isString = isConstructor(String);
  const isNumber = isConstructor(Number);
  const isPlainObject = (obj) => {
    if (hasValue(obj)) {
      return obj.constructor.toString().trim()
        .slice(9, 16) === 'Object(';
    }
    return false;
  };
  const isFunction = (obj) => {
    return (hasValue(obj)) ? obj instanceof Function : false;
  };
  const has = (string, ...search) => {
    return string.includes(...search);
  };
  const hasLength = (obj) => {
    return Boolean(obj.length);
  };
  const isEmpty = (obj) => {
    if (isString(obj) || isArray(obj)) {
      return !hasLength(obj);
    } else if (isPlainObject(obj)) {
      return !objectSize(obj);
    }
    return !hasValue(obj);
  };
  const regexGenerator = (regexType) => {
    return (item) => {
      return (hasValue(item)) ? regexType.test(item) : false;
    };
  };
  const isFileCSS = regexGenerator(/\.css$/);
  const isFileJSON = regexGenerator(/\.json$/);
  const isFileJS = regexGenerator(/\.js$/);

  const getExtensionRegex = /\.([0-9a-z]+)/;
  const getFileExtension = (string) => {
    return string.match(getExtensionRegex);
  };
  const nativeObjectNames = ['RegExp', 'Arguments', 'Boolean', 'Date', 'Error', 'Map', 'Object', 'Set', 'WeakMap',
    'ArrayBuffer', 'Float32Array', 'Float64Array', 'Int8Array', 'Int16Array', 'Int32Array',
    'Uint8Array', 'Uint8ClampedArray',
    'Uint16Array', 'Uint32Array'
  ];
  eachArray(nativeObjectNames, (item) => {
    acid$1[`is${item}`] = isSameObjectGenerator(objectStringGenerate(item));
  });
  assign(acid$1, {
    isFileCSS,
    isFileJSON,
    isFileJS,
    getFileExtension,
    isEmpty,
    hasLength,
    has,
    isFunction,
    isPlainObject,
    isUndefined,
    isNull,
    hasValue,
    isDecimal,
    isString,
    isNumber,
  });

  const ensureArray = (object) => {
    return (isArray(object)) ? object : [object];
  };
  assign(acid$1, {
    ensureArray
  });

  // Flattens a nested array. Pass level to flatten up to a depth;
  const flatten = (arrayArg, level = 1) => {
    let array = arrayArg;
    for (let i = 0; i < level; i++) {
      array = array.reduce((previousValue, currentValue) => {
        return previousValue.concat(ensureArray(currentValue));
      }, []);
    }
    return array;
  };
  const flattenDeep = (array) => {
    return array.reduce((previousValue, currentValue) => {
      return previousValue.concat((isArray(currentValue)) ? flatten(currentValue) : currentValue);
    }, []);
  };
  assign(acid$1, {
    flatten,
    flattenDeep,
  });

  /**
   * Removes all occurrences of the passed in items from the array and returns the array.
   *
   * __Note:__ Unlike {@link Array#without|`.without()`}, this method mutates the array.
   *
   * @function Array#remove
   * @param {...*} *items - Items to remove from the array.
   * @returns {Array} The array this method was called on.
   *
   * @example
   * var array = [1, 2, 3, 3, 4, 3, 5];
   *
   * remove(array,1);
   * // -> [2, 3, 3, 4, 3, 5]
   *
   * remove(array,3);
   * // -> [2, 4, 5]
   *
   * remove(array,[2, 5]);
   * // -> [4]
   */
  const remove = (array, removeTheseArg) => {
    const removeThese = ensureArray(removeTheseArg);
    eachArray(array, (item, index) => {
      if (removeThese.includes(item)) {
        array.splice(array, index, 1);
      }
    });
    return array;
  };
  assign(acid$1, {
    remove
  });

  const chunk = (array, size = 1) => {
    const chunked = [];
    let index = 0;
    array.forEach((item, key) => {
      if (!(key % size)) {
        chunked.push([]);
        if (key) {
          index++;
        }
      }
      chunked[index].push(item);
    });
    return chunked;
  };
  assign(acid$1, {
    chunk,
  });

  const returnFlow = (method) => {
    return (...funcs) => {
      return (arg) => {
        let value;
        method(funcs, (item) => {
          const temp = (hasValue(value)) ? value : arg;
          value = item(temp);
        });
        return value;
      };
    };
  };
  // Returns the composition of a list of functions, where each function consumes the return value of the function that follows. In math terms, composing the functions f(), g(), and h() produces f(g(h())).
  const flow = returnFlow(eachArray);
  // Returns the composition of a list of functions, where each function consumes the return value of the function that follows. In math terms, composing the functions f(), g(), and h() produces f(g(h())).
  const flowRight = returnFlow(eachArrayRight);
  assign(acid$1, {
    flow,
    flowRight,
  });

  const rest = (array) => {
    return array.slice(1, array.length - 1);
  };
  assign(acid$1, {
    rest
  });

  const clear = (array) => {
    array.length = 0;
    return array;
  };
  assign(acid$1, {
    clear,
  });

  const arraySortToObject = (func, array, sortedObject = {}) => {
    eachArray(array, (item, key) => {
      func(item, key, sortedObject);
    });
    return sortedObject;
  };
  assign(acid$1, {
    arraySortToObject
  });

  const groupBy = (array, funct) => {
    return arraySortToObject((item, index, objectArg) => {
      const results = funct(item);
      if (!objectArg[results]) {
        objectArg[results] = [];
      }
      objectArg[results].push(item);
    }, array);
  };
  assign(acid$1, {
    groupBy
  });

  // start from end array using amount as index
  const right = (array, amount) => {
    return array[array.length - 1 - amount];
  };
  assign(acid$1, {
    right
  });

  const cloneArray = (array) => {
    return array.splice();
  };
  assign(acid$1, {
    cloneArray
  });

  const mathNative = Math;
  const floorMethod = mathNative.floor;
  const randomMethod = mathNative.random;
  const add = (number, value) => {
    return number + value;
  };
  const minus = (number, value) => {
    return number - value;
  };
  const divide = (number, value) => {
    return number / value;
  };
  const multiply = (number, value) => {
    return number * value;
  };
  const remainder = (number, value) => {
    return number % value;
  };
  const increment = (number) => {
    return number + 1;
  };
  const deduct = (number) => {
    return number - 1;
  };
  // Returns a random number between min (inclusive) and max (exclusive)
  const randomArbitrary = (max, min = 0) => {
    return randomMethod() * (max - min) + min;
  };
  // Returns a random integer between min (included) and max (excluded)
  const randomInt = (max, min = 0) => {
    return floorMethod(randomMethod() * (max - min)) + min;
  };
  assign(acid$1, {
    add,
    minus,
    divide,
    multiply,
    remainder,
    increment,
    deduct,
    randomArbitrary,
    randomInt
  });

  /*
    Produce a random sample from the list. Pass a number to return n random elements from the list. Otherwise a single random item will be returned.
    sample([1,2,3,4] , 2);
  */
  const sample = (array, amount = 1) => {
    if (amount === 1) {
      return array[randomInt(array.length - 1, 0)];
    }
    const sampleArray = [];
    const used = {};
    let count = 0;
    let index;
    while (count < amount) {
      index = randomInt(array.length - 1, 0);
      if (!used[index]) {
        sampleArray.push(sampleArray[index]);
        used[index] = true;
        count++;
      }
    }
    return sampleArray;
  };
  assign(acid$1, {
    sample
  });

  const compact = (array) => {
    return array.filter((item) => {
      return isString(item) && !item.length ? false : item;
    });
  };
  assign(acid$1, {
    compact,
  });

  // Given a list, and an iteratee function that returns a key for each element in the list (or a property name), returns an object with an index of each item. Just like groupBy, but for when you know your keys are unique.
  const indexBy = (array, index) => {
    return arraySortToObject((item, key, object) => {
      object[item[index]] = item;
    }, array);
  };
  assign(acid$1, {
    indexBy
  });

  const arrayNative = Array;
  const toArray = arrayNative.from;
  assign(acid$1, {
    toArray,
  });

  // shuffle an array and return a new array
  const shuffle = (array, amount = 1) => {
    const shuffleArray = toArray(array);
    let count = 0;
    let index;
    let value;
    while (count < amount) {
      index = randomInt(shuffleArray.length - 1, 0);
      value = shuffleArray[count];
      shuffleArray[count] = shuffleArray[index];
      shuffleArray[index] = value;
      count++;
    }
    return shuffleArray;
  };
  assign(acid$1, {
    shuffle
  });

  const countBy = (array, funct) => {
    const object = {};
    let result;
    eachArray(array, (item) => {
      result = funct(item);
      if (!object[result]) {
        object[result] = 0;
      }
      object[result]++;
    });
    return object;
  };
  const countKey = (array, keyName) => {
    let count = 0;
    eachArray(array, (item) => {
      if (item[keyName]) {
        count++;
      }
    });
    return count;
  };
  const countNoKey = (array, keyName) => {
    let count = 0;
    eachArray(array, (item) => {
      if (!item[keyName]) {
        count++;
      }
    });
    return count;
  };
  assign(acid$1, {
    countBy,
    countKey,
    countNoKey
  });

  const initial = (array) => {
    return array.slice(0, array.length - 1);
  };
  assign(acid$1, {
    initial
  });

  const mathNativeMin = Math.min;
  // get smallest number from array
  const smallest = (array) => {
    return mathNativeMin(...array);
  };
  assign(acid$1, {
    smallest
  });

  const rangeUp = (start, end, increment) => {
    const rangeArray = [];
    let position = start;
    while (position < end) {
      rangeArray.push(position);
      position += increment;
    }
    return rangeArray;
  };
  const rangeDown = (start, end, incrementArg) => {
    const increment = (incrementArg < 0) ? incrementArg * -1 : incrementArg;
    const rangeArray = [];
    let position = start;
    while (position < end) {
      rangeArray.push(position);
      position -= increment;
    }
    return rangeArray;
  };
  const range = (start, end, increment = 1) => {
    if (start < end) {
      return rangeUp(start, end, increment);
    } else {
      return rangeDown(start, end, increment);
    }
  };
  const rangeRight = (start, end, increment = 1) => {
    return rangeDown(end, start, increment);
  };
  assign(acid$1, {
    range,
    rangeRight
  });

  /**
   * Returns an new array that is the [set intersection](http://en.wikipedia.org/wiki/Intersection_(set_theory))
   * of the array and the input array(s).
   *
   * @function Array#intersect
   * @param {...Array} *arrays - A variable number of arrays.
   * @returns {Array} The new array of unique values shared by all of the arrays.
   *
   * @example
   * $.intersect([1, 2, 3], [2, 3, 4]);
   * // -> [2, 3]
   *
   * $.intersect([1, 2, 3], [101, 2, 50, 1], [2, 1]);
   * // -> [1, 2]
   */
  const intersection = (array, ...args) => {
    let yes;
    return filterArray(array, (item) => {
      yes = true;
      eachArray(args, (otherItem) => {
        if (!otherItem.includes(item)) {
          yes = false;
        }
      });
      if (yes) {
        return item;
      }
    });
  };
  assign(acid$1, {
    intersection
  });

  /*
  	Perform alphabetical sort on collection on provided key name
  */
  const sortAlpha = (collection, key) => {
    let currentKey;
    let nextKey;
    collection.sort((current, next) => {
      currentKey = current[key];
      nextKey = next[key];
      if (currentKey < nextKey) {
        return -1;
      } else if (currentKey > nextKey) {
        return 1;
      }
      return 0;
    });
    return collection;
  };
  assign(acid$1, {
    sortAlpha
  });

  const difference = (array, compare) => {
    return filterArray(array, (item) => {
      if (!compare.includes(item)) {
        return item;
      }
    });
  };
  assign(acid$1, {
    difference
  });

  // Calls the method named by methodName on each value in the list. Any extra arguments passed to invoke will be forwarded on to the method invocation.
  const invoke = (array, methodName, args) => {
    return mapArray(array, (item) => {
      return item[methodName](...args);
    });
  };
  assign(acid$1, {
    invoke
  });

  const drop = (array, amount, arrayLength = array.length) => {
    return array.splice(amount, arrayLength);
  };
  const dropRight = (array, amount) => {
    return drop(array, 0, array.length - amount);
  };
  assign(acid$1, {
    drop,
    dropRight
  });

  const isMatchArray = (original, array) => {
    let result = false;
    if (array.length === original.length) {
      eachWhile(original, (item, index) => {
        result = array[index] !== item;
        return result;
      });
    }
    return result;
  };
  assign(acid$1, {
    isMatchArray,
  });

  // Uses a binary search to determine the index at which the value should be inserted into the list in order to maintain the list's sorted order.
  const sortedIndex = (array, n) => {
    let min = 0;
    eachArray(array, (item, index) => {
      if (n > item) {
        min = index;
      }
    });
    if (min > 0) {
      min = min + 1;
    }
    return min;
  };
  assign(acid$1, {
    sortedIndex
  });

  // get largest number from array
  const mathNativeMax = Math.max;
  const largest = (array) => {
    return mathNativeMax(...array);
  };
  assign(acid$1, {
    largest
  });

  const sumOf = (array, resultArg = 0) => {
    let result = resultArg;
    let item;
    eachArray(array, (itemArg) => {
      item = itemArg;
      if (item) {
        result = result + Number(item);
      }
    });
    return result;
  };
  assign(acid$1, {
    sumOf
  });

  /*
    const array = [async function(...args){
      console.log(1,args);
    }, async function(...args){
      console.log(2,args);
    }];
    acid.asyncEach(array,[3,4]);
  */
  const eachAsync = async(array, funct) => {
    const arrayLength = array.length;
    for (let index = 0; index < arrayLength; index++) {
      const item = array[index];
      await funct(item, index, arrayLength);
    }
  };
  assign(acid$1, {
    eachAsync,
  });

  // Returns the last element of an array. Passing n will return the last n elements of the array.
  const last = (array, indexFrom) => {
    const arrayLength = array.length;
    return (indexFrom) ? array.slice(arrayLength - indexFrom, arrayLength) : array[arrayLength - 1];
  };
  assign(acid$1, {
    last
  });

  const take = (array, amount) => {
    return array.slice(0, amount);
  };
  const takeRight = (array, amount) => {
    return array.slice(array.length - amount, amount);
  };
  assign(acid$1, {
    takeRight,
    take
  });

  const mapAsync = async(array, funct) => {
    const results = [];
    const arrayLength = array.length;
    for (let index = 0; index < arrayLength; index++) {
      const item = array[index];
      results[index] = await funct(item, index, arrayLength);
    }
  };
  assign(acid$1, {
    mapAsync,
  });

  const onlyUnique = (value, index, array) => {
    return array.indexOf(value) === index;
  };
  const sortUnique = (item, index, array) => {
    return item !== array[index - 1];
  };
  const unique = (array, isSorted) => {
    if (isSorted) {
      return array.filter(sortUnique);
    }
    return array.filter(onlyUnique);
  };
  assign(acid$1, {
    unique
  });

  // Computes the union of the passed-in arrays: the list of unique items, in order, that are present in one or more of the arrays.
  const union = (...args) => {
    const result = [];
    eachArray(args, (array) => {
      eachArray(unique(array), (item) => {
        if (result.includes(item)) {
          result.push(item);
        }
      });
    });
    return result;
  };
  assign(acid$1, {
    union
  });

  const filterAsync = async(array, funct) => {
    const results = [];
    const arrayLength = array.length;
    let result;
    for (let index = 0; index < arrayLength; index++) {
      const item = array[index];
      result = await funct(item, index, arrayLength);
      if (hasValue(result)) {
        results.push(await funct(item, index, arrayLength));
      }
    }
  };
  assign(acid$1, {
    filterAsync,
  });

  /**
   * Sorts an array in place using a numerical comparison algorithm
   * (sorts numbers from lowest to highest) and returns the array.
   *
   * @function Array#numsort
   * @returns {Array} The array this method was called on.
   *
   * @example
   * var files = [10, 0, 2, 1];
   * files.numsort();
   * console.log(files);
   * // -> [0, 1, 2, 3]
   */
  const numericalCompare = (a, b) => {
    return a - b;
  };
  const numSort = (array) => {
    return array.sort(numericalCompare);
  };
  assign(acid$1, {
    numSort
  });

  const findDifference = (array, sum) => {
    const returnedObject = {};
    const arrayLength = array.length;
    let item;
    let end;
    let check;
    for (let index = 0; index < arrayLength; index++) {
      item = array[index];
      end = sum - item;
      check = array.indexOf(end);
      if (check !== -1 && check !== index) {
        returnedObject.start = item;
        returnedObject.end = end;
        returnedObject.startIndex = index;
        returnedObject.endIndex = check;
        break;
      }
    }
    return returnedObject;
  };
  assign(acid$1, {
    findDifference
  });

  // Converts arrays into objects.
  const arrayToObject = (values, keys$$1) => {
    return arraySortToObject((item, index, objectArg) => {
      objectArg[keys$$1[index]] = item;
    }, values);
  };
  assign(acid$1, {
    arrayToObject
  });

  // Returns a copy of the array with all instances of the values removed.
  const without = (array, ...args) => {
    return array.filter((item) => {
      return !args.includes(item);
    });
  };
  assign(acid$1, {
    without
  });

  const findIndexCache = (element, index, array, indexMatch, propertyName) => {
    if (element[propertyName] === indexMatch) {
      return true;
    }
  };
  const findItem = (array, indexMatch, propertyName = 'id') => {
    const result = array.find((element, index) => {
      return findIndexCache(element, index, array, indexMatch, propertyName);
    });
    return (result === -1) ? false : result;
  };
  const findIndex = (array, indexMatch, propertyName = 'id') => {
    const result = array.findIndex((element, index) => {
      return findIndexCache(element, index, array, indexMatch, propertyName);
    });
    return (result === -1) ? false : result;
  };
  assign(acid$1, {
    findItem,
    findIndex
  });

  // Split array into two arrays: one whose elements all satisfy predicate and one whose elements all do not satisfy predicate.
  const partition = (array, funct) => {
    const failed = [];
    return [
      filterArray(array, (item) => {
        if (funct(item)) {
          return item;
        }
        failed.push(item);
      }),
      failed
    ];
  };
  assign(acid$1, {
    partition
  });

  // Creates an array that is the symmetric difference of the provided arrays. See Wikipedia for more details.
  const xor = (others) => {
    const xored = [];
    eachArray(others, (array) => {
      eachArray(unique(array), (item) => {
        if (xored.includes(item)) {
          xored.splice(xored.indexOf(item), 1);
        } else {
          xored.push(item);
        }
      });
    });
    return xored;
  };
  assign(acid$1, {
    xor
  });

  const findSum = (array, sum) => {
    const returnedObject = {};
    const arrayLength = array.length;
    let item;
    let end;
    let check;
    for (let index = 0; index < arrayLength; index++) {
      item = array[index];
      end = sum - item;
      check = array.indexOf(end);
      if (check !== -1 && check !== index) {
        returnedObject.start = item;
        returnedObject.end = end;
        returnedObject.startIndex = index;
        returnedObject.endIndex = check;
        break;
      }
    }
    return returnedObject;
  };
  assign(acid$1, {
    findSum
  });

  // Pluck an attribute from each object in an array.
  const pluck = (array, pluckThis) => {
    let pluckMethod;
    if (isArray(pluckThis)) {
      pluckMethod = (item) => {
        return arraySortToObject((pluckItem, pluckKey, object) => {
          object[pluckItem] = item[pluckItem];
        }, pluckThis);
      };
    } else {
      pluckMethod = (item) => {
        const result = item[pluckThis];
        return result;
      };
    }
    return mapArray(array, pluckMethod);
  };
  assign(acid$1, {
    pluck
  });

  // Merges together the values of each of the arrays with the values at the corresponding position.
  const zip = (...args) => {
    return args[0].map((item, index) => {
      return args.map((array) => {
        return array[index];
      });
    });
  };
  // unzip the array of zipped arrays [["fred",30,true],["barney",40,false]]
  const unZip = (array) => {
    return array[0].map((item, index) => {
      return array.map((arraySet) => {
        return arraySet[index];
      });
    });
  };
  assign(acid$1, {
    zip,
    unZip
  });

  const first = (array, upTo) => {
    return (upTo) ? array.slice(0, upTo) : array[0];
  };
  assign(acid$1, {
    first
  });

  /**
   * Sorts an array in place using a reverse numerical comparison algorithm
   * (sorts numbers from highest to lowest) and returns the array.
   *
   * @function Array#rnumsort
   * @returns {Array} The array this method was called on.
   *
   * @example
   * var files = [10, 0, 2, 1];
   * files.rnumsort();
   * console.log(files);
   * // -> [3, 2, 1, 0]
   */
  const numericalCompareReverse = (a, b) => {
    return b - a;
  };
  const rNumSort = (array) => {
    return array.sort(numericalCompareReverse);
  };
  assign(acid$1, {
    rNumSort
  });

  const sortNewest = (arrayArg, key, pureMode) => {
    const array = (pureMode) ? arrayArg : [...arrayArg];
    return array.sort((previous, next) => {
      if (!next[key]) {
        return -1;
      } else if (!previous[key]) {
        return 1;
      } else if (previous[key] < next[key]) {
        return 1;
      } else if (previous[key] > next[key]) {
        return -1;
      }
      return 0;
    });
  };
  const getNewest = (array, key) => {
    return sortNewest(array, key)[0];
  };
  assign(acid$1, {
    getNewest,
    sortNewest,
  });

  const sortOldest = (arrayArg, key, pureMode) => {
    const array = (pureMode) ? arrayArg : [...arrayArg];
    return array.sort((previous, next) => {
      if (!next[key]) {
        return -1;
      } else if (!previous[key]) {
        return 1;
      } else if (previous[key] < next[key]) {
        return 1;
      } else if (previous[key] > next[key]) {
        return -1;
      }
      return 0;
    });
  };
  const getOldest = (array, key) => {
    return sortOldest(array, key)[0];
  };
  assign(acid$1, {
    getOldest,
    sortOldest,
  });

  // Creates a function that accepts up to n arguments ignoring any additional arguments. The 2nd argument will be binded if none the initial new function will be.
  const ary = (funct, amount) => {
    return (...args) => {
      return funct(...args.splice(0, amount));
    };
  };
  assign(acid$1, {
    ary
  });

  const curry = (funts) => {
    const args = [];
    const curried = (...curryArgs) => {
      eachArray(curryArgs, (item) => {
        args.push(item);
      });
      return curried;
    };
    curried.result = () => {
      const results = funts(...args);
      clear(args);
      return results;
    };
    return curried;
  };
  const curryRight = (funts) => {
    const args = [];
    const curried = (...curryArgs) => {
      eachArray(curryArgs, (item) => {
        args.unshift(item);
      });
      return curried;
    };
    curried.result = () => {
      const results = funts(...args);
      clear(args);
      return results;
    };
    return curried;
  };
  assign(acid$1, {
    curry,
    curryRight
  });

  // Creates a function that is restricted to execute func once. Repeat calls to the function will return the value of the first call. The func is executed with the this binding of the created function.
  const once = (fn) => {
    let value;
    const onlyOnce = (...args) => {
      if (!value) {
        value = fn(...args);
      }
      return value;
    };
    return onlyOnce;
  };
  // Creates a function that executes func, with the this binding and arguments of the created function, only after being called n times.
  const afterFn = (amountArg, fn) => {
    let amount = amountArg;
    const onlyAfter = (...args) => {
      amount--;
      if (amount < 0) {
        return fn(...args);
      }
    };
    return onlyAfter;
  };
  // Creates a function that executes func, with the this binding and arguments of the created function, only before being called n times.
  const beforeFn = (amountArg, fn) => {
    let amount = amountArg;
    const onlyBefore = (...args) => {
      amount--;
      if (amount > 0) {
        return fn(...args);
      }
    };
    return onlyBefore;
  };
  // Creates a function that executes func, with the this binding and arguments of the created function, only after or equal to being called n times.
  const onAfter = (amount, fn) => {
    return afterFn(amount - 1, fn);
  };
  // Creates a function that executes func, with the this binding and arguments of the created function, only before or equal to being called n times.
  const onBefore = (amount, fn) => {
    return beforeFn(amount + 1, fn);
  };
  assign(acid$1, {
    onAfter,
    onBefore,
    once
  });

  const stubObject = () => {
    return {};
  };
  const stubArray = () => {
    return [];
  };
  const stubString = () => {
    return '';
  };
  const stubFalse = () => {
    return false;
  };
  const stubTrue = () => {
    return true;
  };
  const noop = () => {
    return undefined;
  };
  assign(acid$1, {
    stubObject,
    stubArray,
    stubString,
    stubTrue,
    stubFalse,
    noop
  });

  const eachObject = (thisObject, fn) => {
    eachArray(keys(thisObject), (key, index, array, propertyCount) => {
      fn(thisObject[key], key, thisObject, propertyCount);
    });
  };
  const mapObject = (object, fn) => {
    const results = {};
    eachObject(object, (item, key, thisObject, propertyCount) => {
      results[key] = fn(item, key, thisObject, propertyCount);
    });
    return results;
  };
  const filterObject = (object, fn) => {
    const results = {};
    let result;
    eachObject(object, (item, key, thisObject, propertyCount) => {
      result = fn(item, key, thisObject, propertyCount);
      if (hasValue(result)) {
        results[key] = result;
      }
    });
    return results;
  };
  const mapProperty = (array, funct) => {
    const thisObject = {};
    eachArray(getOwnPropertyNames(array), (item, key, arrayLength) => {
      thisObject[item] = funct(array[item], item, array, arrayLength, thisObject);
    });
    return thisObject;
  };
  const forIn = (thisObject, fn) => {
    const mappedObject = {};
    for (const key in thisObject) {
      mappedObject[key] = fn(thisObject[key], key, thisObject, mappedObject);
    }
    return mappedObject;
  };
  assign(acid$1, {
    mapObject,
    filterObject,
    eachObject,
    mapProperty,
    forIn,
  });

  const forEachWrap = (object, funct) => {
    return object.forEach(funct);
  };
  const generateCheckLoops = (first, second) => {
    return (object, funct) => {
      let returned;
      if (!hasValue(object)) {
        return;
      } else if (isArray(object)) {
        returned = first;
      } else if (isPlainObject(object) || isFunction(object)) {
        returned = second;
      } else if (object.forEach) {
        returned = forEachWrap;
      } else {
        returned = second;
      }
      return returned(object, funct);
    };
  };
  const map = generateCheckLoops(mapArray, mapObject);
  const each = generateCheckLoops(eachArray, eachObject);
  const filter = generateCheckLoops(filterArray, filterObject);
  assign(acid$1, {
    map,
    each,
    filter
  });

  const bindAll = (bindThese, withThis) => {
    return map(bindThese, (item) => {
      return isFunction(item) ? item.bind(withThis) : item;
    });
  };
  assign(acid$1, {
    bindAll
  });

  const ifInvoke = (method, ...args) => {
    if (isFunction(method)) {
      return method(...args);
    }
  };
  assign(acid$1, {
    ifInvoke
  });

  // Creates a function that negates the result of the predicate func. The func predicate is invoked with the this binding and arguments of the created function.
  const negate = (func) => {
    return (...args) => {
      return !func(...args);
    };
  };
  assign(acid$1, {
    negate
  });

  const overEvery = (array) => {
    return (...args) => {
      let result;
      array.find(array, (item) => {
        result = Boolean(item(...args));
        return result;
      });
      return result;
    };
  };
  const over = (array) => {
    return (...args) => {
      return array.map((item) => {
        return item(...args);
      });
    };
  };
  assign(acid$1, {
    over,
    overEvery,
  });

  const timer = (fn, time) => {
    return setTimeout(fn, time);
  };
  const interval = (fn, time) => {
    return setInterval(fn, time);
  };


  const debounce = (original, time) => {
    let timeout = false;
    const fn = (...args) => {
      if (timeout !== false) {
        clearTimeout(timeout);
      }
      timeout = timer(() => {
        original(...args);
        timeout = false;
      }, time);
    };
    fn.clear = () => {
      if (timeout) {
        clearTimeout(timeout);
        timeout = false;
      }
    };
    return fn;
  };
  const throttle = (func, time) => {
    let timeout = false;
    let shouldThrottle;
    const fn = (...args) => {
      if (timeout) {
        shouldThrottle = true;
        return;
      }
      func(...args);
      timeout = timer(() => {
        if (shouldThrottle) {
          func(...args);
        }
        timeout = false;
      }, time);
    };
    fn.clear = () => {
      clearTimeout(timeout);
      timeout = false;
    };
    return fn;
  };
  assign(acid$1, {
    interval,
    timer,
    debounce,
    throttle,
  });

  const addLink = (link, addToChain) => {
    each(addToChain, (item, key) => {
      link.methods[key] = (...args) => {
        args.unshift(link.value);
        item(...args);
        return link.methods;
      };
    });
    return link;
  };
  const chain = (methods) => {
    const link = (value) => {
      link.value = value;
      return link.methods;
    };
    assign(link, {
      methods: {},
      link(addToChain) {
        return addLink(link, addToChain);
      },
      done() {
        const value = link.value;
        link.value = null;
        return value;
      }
    });
    link.link(methods);
    return link;
  };
  assign(acid$1, {
    chain
  });

  const inSync = (fns, arg) => {
    return each(fns, (item) => {
      item(arg);
    });
  };
  const inAsync = async(fns, arg) => {
    await eachAsync(fns, async(item) => {
      await item(arg);
    });
  };
  assign(acid$1, {
    inAsync,
    inSync,
  });

  const nthArg = (numArg) => {
    let num = numArg;
    return (...args) => {
      if (num < 0) {
        num = args.length - (num * -1);
      }
      return args[num];
    };
  };
  assign(acid$1, {
    nthArg
  });

  // Creates a function that invokes func with arguments arranged according to the specified indexes where the argument value at the first index is provided as the first argument, the argument value at the second index is provided as the second argument, and so on.
  const reArg = (funct, list) => {
    return (...args) => {
      return funct(...list.map((item) => {
        return args[item];
      }));
    };
  };
  /*
  var rearg=(function(a, b, c) {
    return [a, b, c];
  },[1,2,0]);

  rearg(1,2,3);
  -> [2, 3, 1]
  */
  assign(acid$1, {
    reArg
  });

  const wrap = (...args) => {
    const list = [];
    const wrapped = (...wrappedArgs) => {
      return list.map((item) => {
        return item(...wrappedArgs);
      });
    };
    assign(wrapped, {
      list,
      add(...addTheseArg) {
        list.push(...addTheseArg);
      },
    });
    wrapped.add(args);
    return wrapped;
  };
  const wrapBefore = (...args) => {
    const list = [];
    const wrapped = (...wrappedArgs) => {
      return list.map((item) => {
        return item(...wrappedArgs);
      });
    };
    assign(wrapped, {
      list,
      add(...addThese) {
        list.unshift(...addThese.reverse());
      },
    });
    wrapped.add(args);
    return wrapped;
  };
  assign(acid$1, {
    wrap,
    wrapBefore
  });

  const isZero = (item) => {
    return item === 0;
  };
  const isNumberEqual = (item, num) => {
    return item === num;
  };
  const isNumberInRange = (num, start = 0, end = start) => {
    return num > start && num < end;
  };
  assign(acid$1, {
    isNumberInRange,
    isNumberEqual,
    isZero
  });

  const assignDeep = (object, otherObject, mergeArrays) => {
    eachObject(otherObject, (item, key) => {
      if (isPlainObject(item) && isPlainObject(object[key])) {
        assignDeep(object[key], item, mergeArrays);
      } else if (mergeArrays && isArray(item) && isArray(object[key])) {
        object[key].push(...item);
      } else {
        object[key] = item;
      }
    });
    return object;
  };
  assign(acid$1, {
    assignDeep
  });

  const hasKeys = (object, properties) => {
    let flag = false;
    const objectKeys = keys(object);
    eachWhile(properties, (item) => {
      flag = objectKeys.include(item);
      return flag;
    });
    return flag;
  };
  const hasAnyKeys = (object, properties) => {
    const objectKeys = keys(object);
    const flag = properties.find((item) => {
      return objectKeys.include(item);
    });
    return flag;
  };
  assign(acid$1, {
    hasAnyKeys,
    hasKeys,
  });

  /*
  	Performs a deep comparison between object and source to determine if object contains equivalent property values.
  */
  const isEqual = (object, compareObject) => {
    let result = false;
    if (object === compareObject) {
      result = true;
    } else if (object.toString() === compareObject.toString()) {
      if (isPlainObject(object)) {
        const sourceProperties = keys(object);
        if (isMatchArray(sourceProperties, keys(compareObject))) {
          eachWhile(sourceProperties, (key) => {
            result = isEqual(object[key], compareObject[key]);
            return result;
          });
        }
      } else if (isArray(object)) {
        if (object.length === compareObject.length) {
          eachWhile(object, (item, index) => {
            result = isEqual(item, compareObject[index]);
            return result;
          });
        }
      }
    }
    return result;
  };
  assign(acid$1, {
    isEqual,
  });

  const pick = (array, originalObject, newObject) => {
    return arraySortToObject((item, key, object) => {
      object[item] = originalObject[item];
    }, array, newObject);
  };
  assign(acid$1, {
    pick
  });

  const compactKeys = (object) => {
    const keys$$1 = [];
    eachObject(object, (item, key) => {
      if (hasValue(item)) {
        keys$$1.push(key);
      }
    });
    return keys$$1;
  };
  assign(acid$1, {
    compactKeys
  });

  const isMatchObject = (source, compare) => {
    let result = false;
    const sourceProperties = keys(source);
    if (isMatchArray(sourceProperties, keys(compare))) {
      eachWhile(sourceProperties, (key) => {
        result = source[key] === compare[key];
        return result;
      });
    }
    return result;
  };
  assign(acid$1, {
    isMatchObject,
  });

  const zipObject = (keys$$1, values) => {
    return arraySortToObject((item, index, object) => {
      object[item] = values[index];
    }, keys$$1);
  };
  const unZipObject = (object) => {
    const keys$$1 = [];
    const values = [];
    eachObject(object, (item, key) => {
      keys$$1.push(key);
      values.push(item);
    });
    return [keys$$1, values];
  };
  assign(acid$1, {
    zipObject,
    unZipObject,
  });

  const invert = (thisObject, invertedObject = {}) => {
    eachObject(thisObject, (item, key) => {
      invertedObject[item] = key;
    });
    return invertedObject;
  };
  assign(acid$1, {
    invert,
  });

  const omit = (originalObject, array) => {
    return filterObject(originalObject, (item, key) => {
      if (!array.includes(key)) {
        return item;
      }
    });
  };
  assign(acid$1, {
    omit
  });

  const normalizeCase = /[-_]/g;
  const spaceFirstLetter = / (.)/g;
  const upperCase = (string) => {
    return string.replace(normalizeCase, ' ')
      .trim()
      .toUpperCase();
  };
  const camelCase = (stringArg) => {
    const string = stringArg
      .toLowerCase()
      .replace(spaceFirstLetter, (match) => {
        return match.toUpperCase();
      });
    return string;
  };
  const kebabCase = (string) => {
    return string.replace(normalizeCase, ' ')
      .trim()
      .toLowerCase()
      .replace(spaceFirstLetter, '-$1');
  };
  const snakeCase = (string) => {
    return string.replace(normalizeCase, ' ')
      .trim()
      .toLowerCase()
      .replace(spaceFirstLetter, '_$1');
  };
  assign(acid$1, {
    upperCase,
    camelCase,
    kebabCase,
    snakeCase,
  });

  const insertInRange = (text, start, end, insert) => {
    return text.slice(0, start) + insert + text.slice(end, text.length);
  };
  const rightString = (text, a) => {
    return [text.length - 1 - a];
  };
  const chunkString = (string, size) => {
    return string.match(new RegExp(`(.|[\r\n]){1, ${size}}`, 'g'));
  };
  const initialString = (string) => {
    return string.slice(0, -1);
  };
  const restString = (string) => {
    return string.slice(1, string.length);
  };
  assign(acid$1, {
    chunkString,
    initialString,
    insertInRange,
    restString,
    rightString,
  });

  const replaceWithList = (string, array, toReplace) => {
    return string.replace(new RegExp(`\\b${array.join('|')}\\b`, 'gi'), toReplace);
  };
  assign(acid$1, {
    replaceWithList
  });

  const rawURLDecodeRegex = /%(?![\da-f]{2})/gi;
  const andRegex = /&/g;
  const lessThanRegex = /</g;
  const moreThanRegex = />/g;
  const doubleQuoteRegex = /"/g;
  const forwardSlashRegex = /\//g;
  const rawURLDecode = (string) => {
    return decodeURIComponent(string.replace(rawURLDecodeRegex, () => {
      return '%25';
    }));
  };
  const createHtmlEntities = (stringArg) => {
    let string = stringArg;
    string = string.replace(andRegex, '&amp;');
    string = string.replace(lessThanRegex, '&lt;');
    string = string.replace(moreThanRegex, '&gt;');
    string = string.replace(doubleQuoteRegex, '&quot;');
    return string.replace(forwardSlashRegex, '&quot;');
  };
  const sanitize = (string) => {
    return createHtmlEntities(rawURLDecode(string));
  };
  assign(acid$1, {
    createHtmlEntities,
    rawURLDecode,
    sanitize
  });

  const tokenizeRegEx = /\S+/g;
  const wordsRegEx = /\w+/g;
  const tokenize = (string) => {
    return string.match(tokenizeRegEx) || [];
  };
  const words = (string) => {
    return string.match(wordsRegEx) || [];
  };
  assign(acid$1, {
    tokenize,
    words
  });

  const truncate = (stringArg, amount) => {
    let string = stringArg;
    if (string.length > amount) {
      string = string.slice(0, amount);
    }
    return string;
  };
  const truncateLeft = (stringArg, amount) => {
    let string = stringArg;
    const stringLength = string.length;
    if (stringLength > amount) {
      string = string.substr(amount, stringLength);
    }
    return string;
  };
  const truncateWord = (string, amount) => {
    return string.substring(0, amount);
  };
  assign(acid$1, {
    truncate,
    truncateLeft,
    truncateWord,
  });

  const spaceFirstLetter$1 = / (.)/g;
  const upperFirstLetter = (string) => {
    return string[0].toUpperCase();
  };
  const restString$1 = (string, num = 1) => {
    return string.substr(num);
  };
  const upperFirst = (string) => {
    return upperFirstLetter(string) + restString$1(string);
  };
  const upperFirstAll = (string) => {
    return string.replace(spaceFirstLetter$1, (match) => {
      return match.toUpperCase();
    });
  };
  const upperFirstOnly = (string) => {
    return upperFirstLetter(string) + restString$1(string).toLowerCase();
  };
  const upperFirstOnlyAll = (string) => {
    return string.toLowerCase()
      .replace(spaceFirstLetter$1, (match) => {
        return match.toUpperCase();
      });
  };

  assign(acid$1, {
    restString: restString$1,
    upperFirst,
    upperFirstAll,
    upperFirstOnly,
    upperFirstOnlyAll,
  });

  const functionPrototype = Function.prototype;

  function cacheNativeMethod(funct) {
    return functionPrototype.call.bind(funct);
  }
  assign(acid$1, {
    cacheNativeMethod
  });

  const ifNotEqual = (rootObject, property, equalThis) => {
    if (property) {
      rootObject[property] = rootObject[property] || equalThis;
      return rootObject[property];
    }
    return rootObject;
  };
  assign(acid$1, {
    ifNotEqual,
  });

  const regexToPath = /\.|\[/;
  const regexCloseBracket = /]/g;
  const emptyString = '';
  const toPath = (string) => {
    return string.replace(regexCloseBracket, emptyString).split(regexToPath);
  };
  assign(acid$1, {
    toPath,
  });

  const get = (propertyString, objectChain = acid$1) => {
    let link = objectChain;
    eachWhile(toPath(propertyString), (item) => {
      link = link[item];
      return hasValue(link);
    });
    return link;
  };
  assign(acid$1, {
    get
  });

  const matchesProperty = (path, srcValue) => {
    return (item) => {
      return get(path, item) === srcValue;
    };
  };
  assign(acid$1, {
    matchesProperty
  });

  let count = 0;
  const uuidFree = [];
  const uuidClosed = {};
  const uuid = () => {
    let result = uuidFree.shift(uuidFree);
    if (!hasValue(result)) {
      result = count;
      uuidClosed[result] = true;
      count++;
    }
    return result;
  };
  uuid.remove = (id) => {
    uuidClosed[id] = null;
    uuidFree.push(id);
  };
  assign(acid$1, {
    uuid,
  });

  const jsonNative = JSON;
  const jsonParse = jsonNative.jsonParse;
  const stringify = jsonNative.stringify;
  assign(acid$1, {
    jsonParse,
    stringify
  });

  const model = (modelName, object) => {
    if (hasValue(object)) {
      model[modelName] = object;
    }
    return get(modelName, model);
  };
  acid$1.superMethod(model);
  assign(acid$1, {
    model
  });

  const promise = (callback) => {
    return new Promise(callback);
  };
  assign(acid$1, {
    promise
  });

  const toggle = (value, a, b) => {
    return (value === a) ? b : a;
  };
  assign(acid$1, {
    toggle
  });

  return acid$1;

})));
//# sourceMappingURL=index.js.map