const assertEqual = function (actual, expected) {
  if (actual !== expected) {
    console.log(`๐๐๐Assertion failed: ${actual} !== ${expected}`);
  } else {
    console.log(`โ โ โ Assertion Passed: ${actual} === ${expected}`);
  }
};

assertEqual("Lighthouse Labs", "Bootcamp");
assertEqual(1, 1);
assertEqual(1, 5);
