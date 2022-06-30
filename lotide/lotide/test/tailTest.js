const assertEqual = require("../assertEqual");
const tail = require("../tail");
const chai = require("chai"); // 1
const assert = chai.assert;

// console.log(tail([1, 2, 3, 4]));

describe("#tail", () => {
  it("returns [2, 3, 4] for [1, 2, 3, 4]", () => [
    assert.deepEqual(tail([1, 2, 3, 4]), [2, 3, 4]),
  ]);
});
