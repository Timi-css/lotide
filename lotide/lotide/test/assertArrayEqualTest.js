const assertArrayEqual = require("../assertArraysEqual");

assertArrayEqual([1, 2, 3], [1, 2, 3]);
assertArrayEqual([4, 5, 6], [1, 2, 3]);
assertArrayEqual([1], [1]);
assertArrayEqual(["Goat", "Cow", "Chicken"], ["Goat", "Cow", "Chicken"]);
