// // Functions are first-class objects
// // 1. Functions can be stored as variables. Example:
// const myFunc = function () {
//   console.log("I am a function.");
// };

// // 2. Functions can do everything that other objects can do (like having properties assigned to them)
// const myFn = function () {
//   console.log("I am a function.");
// };

// myFn.someAttribute = 42;
// console.log(mFn.someAttribute);

// function runner(f) {
//   f();
// }

// runner(myFn);

//  The most notable use of functions as values is a Callback Function.
// Callack Function is a function that is passed into another fucntion called the receiver function
// The receiver function is therefore accepting behaviour to perform by calling the callback function
// The receiverfunction can decide to call the callback function at any time and as many times as it wants to
// Example:

const findWaldo = function (names, found) {
  for (let i = 0; i < names.length; i++) {
    let name = names[i];
    if (name === "Waldo") {
      found(); //execute callback
    }
  }
};

const actionWhenFound = function () {
  console.log("Found him!");
};

findWaldo(["Alice", "Bob", "Waldo", "Winston"], actionWhenFound);
