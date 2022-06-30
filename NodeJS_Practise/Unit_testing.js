// Example of a simple function
function largestNumber(array) {
  return array.reduce((previousValue, currentValue) => {
    return Math.max(previousValue, currentValue);
  });
}
// Example of a test for that function
const array = [1, 2, 3, 4, 5];
const largest = largestNumber(array);
assert.equal(largest, 5);
