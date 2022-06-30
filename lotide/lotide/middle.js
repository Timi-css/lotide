const assertArrayEqual = require("./assertArraysEqual");
const eqArrays = require("./eqArrays");

const middle = function (array) {
  if (array.length <= 2) {
    return [];
  } else if (array.length % 2 === 0) {
    // Array is even in this case
    let median2 = array.length / 2;
    let median1 = (array.length - 2) / 2;

    let result = [array[median1], array[median2]];
    return result;
  } else {
    let oddArr = (array.length - 1) / 2;

    let result = [array[oddArr]];
    return result;
  }
};

module.exports = middle;
