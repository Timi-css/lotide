const assertArrayEqual = function (arr, arr2) {
  for (let i = 0; i <= arr.length; i++) {
    if (arr[i] !== arr2[i]) {
      console.log(`🛑🛑🛑 assertArray Failed: ${arr} !== ${arr2} `);
    } else {
      console.log(`✅ ✅ ✅  assertArray Passed: ${arr} === ${arr2} `);
    }
  }
};

assertArrayEqual([1, 2, 3], [1, 2, 3]);
assertArrayEqual([4, 5, 6], [1, 2, 3]);
assertArrayEqual([1], [1]);
assertArrayEqual(["Goat", "Cow", "Chicken"], ["Goat", "Cow", "Chicken"]);
