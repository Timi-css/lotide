const eqArrays = function (arr, arr2) {
  for (let i = 0; i <= arr.length; i++) {
    if (arr[i] !== arr2[i]) {
      return false;
    }
  }
  return true;
};

const assertArrayEqual = function (arr, arr2) {
  for (let i = 0; i <= arr.length; i++) {
    if (arr[i] !== arr2[i]) {
      console.log(`🛑🛑🛑 assertArray Failed: ${arr} !== ${arr2} `);
    } else {
      console.log(`✅ ✅ ✅  assertArray Passed: ${arr} === ${arr2} `);
    }
  }
};

const without = function (source, itemsToRemove) {
  let result = source;
  for (let i = 0; i < source.length; i++) {
    for (let j = 0; j < itemsToRemove.length; j++) {
      if (source[i] === itemsToRemove[j]) {
        result.splice(i, 1);
      }
    }
  }
  return result;
};

// console.log(without([1, 2, 3], [1]));
// console.log(without(["1", "2", "3"], [1, 2, "3"]));
without([1, 2, 3], [1]); // => [2, 3]
without(["1", "2", "3"], [1, 2, "3"]); // => ["1", "2"]
