const findWaldo = function (names, found) {
  names.forEach((element) => {
    if (element === "Waldo") {
      found(element); //execute callback

      return;
    }
  });
};

const actionWhenFound = function (waldoIndex) {
  console.log("Found him!", waldoIndex);
};

console.log(findWaldo(["Alice", "Bob", "Waldo", "Winston"], actionWhenFound));

// for (let i = 0; i < names.length; i++) {
//   let name = names[i];
//   if (name === "Waldo") {
//     found(i); //execute callback
//   }
// }
