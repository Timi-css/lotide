const eqArrays = function (arr, arr2) {
  for (let i = 0; i <= arr.length; i++) {
    if (arr[i] !== arr2[i]) {
      return false;
    }
  }
  return true;
};

module.exports = eqArrays;
