const words = ["ground", "control", "to", "major", "tom"];
const map = function (arrMap, callback) {
  const results = [];

  for (let array of arrMap) {
    // console.log("array before: ", array);
    // console.log("array after: ", callback(array));
    // console.log("---");
    results.push(callback(array));
  }
  return results;
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

const eqArrays = function (arr, arr2) {
  for (let i = 0; i <= arr.length; i++) {
    if (arr[i] !== arr2[i]) {
      return false;
    }
  }
  return true;
};

const results1 = map(words, (word) => word[0]);
console.log(results1);

assertArrayEqual(words, results1);
