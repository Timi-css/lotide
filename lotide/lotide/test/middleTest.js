const assertArrayEqual = require("../assertArraysEqual");
const eqArrays = require("../eqArrays");
const middle = require("../middle");
const chai = require("chai"); // 1
const assert = chai.assert;

// console.log(middle([1, 2, 3, 4, 5, 6])); // => [3]
// console.log(middle([1, 2, 3])); // => [2]

describe("#tail", () => {
  it("returns [2] for [1, 2, 3]", () => [
    assert.deepEqual(middle([1, 2, 3]), [2]),
  ]);
});
