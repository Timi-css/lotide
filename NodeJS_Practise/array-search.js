function search(array, item) {
  let index = null;

  for (let i = 0; i < array.length; i++) {
    if (item === array[i]) {
      index = i;
      break;
    }
  }

  return index;
}

console.log(search([2, 4, 5, 7, 8, 98], 98));

function arrayContainsSum(array, sum) {
  for (let i = 0; i < array.length; i++) {
    const element1 = array[i];

    for (let ii = 0; ii < array.length; ii++) {
      const element2 = array[ii];

      if (element1 + element2 === sum) {
        return true;
      }
    }
  }
  return false;
}

console.log(arrayContainsSum([2, 3, 4, 5, 6, 10, 0], 9));
