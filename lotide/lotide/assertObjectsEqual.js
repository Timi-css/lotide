// Returns true if both objects have identical keys with identical values.
// Otherwise you get back a big fat false!
const eqObjects = function (object1, object2) {
  //First, use the Object.keys function on both objects and compare their lengths.
  // If not equal, there's no point in going further: return false
  let keys1 = Object.keys(object1);
  let keys2 = Object.keys(object2);
  if (keys1.length !== keys2.length) {
    return false;
  }
  // loop through the keys returned by Object.keys for one of the objects
  for (key of keys1) {
    if (!Array.isArray(object1[key]) && !Array.isArray(object2[key])) {
      if (object1[key] !== object2[key]) {
        return false;
      }
    } else {
      const result = eqArrays(object1[key], object2[key]);
      //console.log("checking the result from eq:"+result)
      if (!result) {
        return false;
      }
    }
  }
  return true;
};

const assertEqual = function (actual, expected) {
  if (actual !== expected) {
    console.log(`🛑🛑🛑Assertion failed: ${actual} !== ${expected}`);
  } else {
    console.log(`✅ ✅ ✅ Assertion Passed: ${actual} === ${expected}`);
  }
};

assertEqual("Lighthouse Labs", "Bootcamp");
assertEqual(1, 1);
assertEqual(1, 5);

//Implement assertObjectsEqual which will take in two objects and console.log an appropriate message to the console.
// FUNCTION IMPLEMENTATION
const assertObjectsEqual = function (actual, expected) {
  // Implement me!
  const assertEqual = function (actual, expected) {
    if (actual === expected) {
      //console.log("Assertion Passed: " + actual + " === " + expected);
      console.log(`Assertion passed: ${actual} === ${expected}`);
    } else {
      //console.log("Assertion Failed: " + actual + " !== " + expected);
      console.log(`Assertion failled: ${actual} !== ${expected}`);
    }
  };
};
const ab = { a: "1", b: "2" };
const ba = { b: "2", a: "1" };
//console.log(eqObjects(ab, ba)); // => true

const abc = { a: "1", b: "2", c: "3" };
//console.log(eqObjects(ab, abc)); // => false
//assertObjectEqual(eqArrays(middle([1, 2, 3, 4]),[2, 3]), true);
assertObjectsEqual(eqObjects(ab, ba), true);
