const transpose = function (matrix) {
  var newArray = [];
  for (var i = 0; i < matrix[0].length; i++) {
    newArray.push([]);
  }
  // Put your solution here
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      // console.log("This is the first item of the first array: ", matrix[i][j]);
      newArray[j].push(matrix[i][j]);
      // console.log(newArray[j]);
    }
  }
  console.log(newArray);
  return newArray;
};
// Do not edit this function.
const printMatrix = (matrix) => {
  for (const row of matrix) {
    for (const el of row) {
      process.stdout.write(el + " ");
    }
    process.stdout.write("\n");
  }
};

printMatrix(
  transpose([
    [1, 2, 3, 4],
    [1, 2, 3, 4],
    [1, 2, 3, 4],
  ])
);
console.log("----");

printMatrix(
  transpose([
    [1, 2],
    [3, 4],
    [5, 6],
  ])
);

console.log("----");

printMatrix(transpose([[1, 2, 3, 4, 5, 6, 7]]));
