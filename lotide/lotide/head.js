const assertEqual = function (actual, expected) {
  if (actual !== expected) {
    console.log(`๐๐๐Assertion failed: ${actual} !== ${expected}`);
  } else {
    console.log(`โ โ โ Assertion Passed: ${actual} === ${expected}`);
  }
};

const head = function (array) {
  if (array.length === 0) {
    return undefined;
  } else {
    return array[0];
  }
};
assertEqual(head([5, 6, 7]), 5);
assertEqual(head(["Hello", "Lighthouse", "Labs"]), "Hello");
