const assertArrayEqual = function (arr, arr2) {
  for (let i = 0; i <= arr.length; i++) {
    if (arr[i] !== arr2[i]) {
      console.log(`🛑🛑🛑 assertArray Failed: ${arr} !== ${arr2} `);
    } else {
      console.log(`✅ ✅ ✅  assertArray Passed: ${arr} === ${arr2} `);
    }
  }
};

module.exports = assertArrayEqual;
