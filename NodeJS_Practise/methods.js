const person = {
  firstName: "Bob",
  lastName: "Smith",
  fullName: function () {
    return this.firstName + " " + this.lastName;
  },
};

console.log(person.firstName);
console.log("Hello " + person.firstName + " " + person.lastName);
console.log("Hello, " + person.fullName());

// ===================================================================

const sageMeadowsGarden = {
  house1: 1009,
  house2: 1011,
  house3: 1013,
  house4: 1015,

  row1: function () {
    return (
      this.house1 + ", " + this.house2 + ", " + this.house3 + ", " + this.house4
    );
  },
};

console.log(
  "My house is amongst one these house numbers " + sageMeadowsGarden.row1()
);

const doStuff = function (arr, callback) {
  return callback(arr);
}; // gimme an array and a function and I'll apply the function to the array

const add = function (arr) {
  let sum = 0;
  for (let a of arr) {
    sum += a;
  }
  return sum;
};

const multiply = function (arr) {
  let product = 1;
  for (let a of arr) {
    product *= a;
  }
  return product;
};

const stuff = doStuff([1, 2, 3], add);
console.log(stuff);
