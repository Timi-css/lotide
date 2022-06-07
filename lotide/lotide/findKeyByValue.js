const assertEqual = function (actual, expected) {
  if (actual !== expected) {
    console.log(`🛑🛑🛑Assertion failed: ${actual} !== ${expected}`);
  } else {
    console.log(`✅ ✅ ✅ Assertion Passed: ${actual} === ${expected}`);
  }
};

const bestTVShowsByGenre = {
  sci_fi: "The Expanse",
  comedy: "Brooklyn Nine-Nine",
  drama: "The Wire",
};

const findKeyByValue = function (keys, value) {
  const keyFound = Object.keys(keys);

  for (let key of keyFound) {
    // Stop the loop thru array once get first key
    if (keys[key] === value) {
      return key;
    }
  }
  //return findKeyByValue;
  return undefined;
};

// console.log(findKeyByValue(bestTVShowsByGenre));

assertEqual(findKeyByValue(bestTVShowsByGenre, "The Wire"), "sci_fi");
assertEqual(findKeyByValue(bestTVShowsByGenre, "The Wire"), "drama");
assertEqual(findKeyByValue(bestTVShowsByGenre, "That '70s Show"), undefined);
