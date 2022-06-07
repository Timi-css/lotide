// const printItems = function (array) {
//   for (let item of array) {
//     console.log(item);
//   }
// };

// const array = ["😎", "💩", "🤗", "😼", "😂"];
// // printItems(array);

const printItems = function (array) {
  for (let item of array) {
    if (Array.isArray(item)) {
      // Print out all it's items individually
    } else {
      console.log(item);
    }
  }
};

const array = ["😎", "💩", "🤗", "😼", "😂"];
printItems(array);
