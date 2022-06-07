const findWaldo = function (names, found) {
  names.forEach((element) => {
    if (element === "Waldo") {
      found(element); //execute callback

      return;
    }
  });
};

// -------------------------------------------------------------
const actionWhenFound = function (waldoIndex) {
  console.log("Found him!", waldoIndex);
};

console.log(
  findWaldo(["Alice", "Bob", "Waldo", "Winston"], function (index) {
    console.log("Waldo is located at:", index);
  })
);
