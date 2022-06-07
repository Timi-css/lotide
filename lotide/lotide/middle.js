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

console.log(middle([1, 2, 3])); // => [2]
console.log(middle([1, 2, 3, 4, 5, 6])); // => [3]
