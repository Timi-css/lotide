const assertEqual = function (actual, expected) {
  if (actual !== expected) {
    console.log(`🛑🛑🛑Assertion failed: ${actual} !== ${expected}`);
  } else {
    console.log(`✅ ✅ ✅ Assertion Passed: ${actual} === ${expected}`);
  }
};
const tail = function (array) {
  if (array.length === 0 || array.length === 1) {
    return [];
  } else {
    return array.slice(1);
  }
};

console.log(tail([1, 2, 3, 4]));
