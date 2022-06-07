const person = {
  firstName: "Timi",
};

// This is a longer way of accessing the key firstName in the Object person
// const propertyName = "firstName";
// const fisrtName = person[propertyName];

// console.log(fisrtName);

//  An easier way of accesing an object key would be:
const firstNames = person["firstName"];
console.log(firstNames);

// An alternative but strict way to access the key

// Trying to access a keyy that is not defined in the object will give you undefined
const nonExistingKey = person["foo"];
console.log(nonExistingKey);

// Assigning a new value to a key
person["firstName"] = "Mary Jane";
person["age"] = 22;

console.log(person);

// Nesting an object within an object
// Object key-value pairs could have objects withing them

const human = {
  name: "Paul",
  address: {
    street: "310 W 95th",
    city: "New York",
    zipCode: 10027,
  },
};

const humansAddress = human["address"]["city"];
console.log(humansAddress);

// Iterating objects with for in loop
var planetMoons = {
  mercury: 0,
  venus: 0,
  earth: 1,
  mars: 2,
  jupiter: 67,
  saturn: 62,
  uranus: 27,
  neptune: 14,
};

for (var planet in planetMoons) {
  var numberofMoons = planetMoons[planet];

  console.log("Planet: " + planet + ", # of Moons: " + numberofMoons);
}
for (var planet in planetMoons) {
  // additional filter for object properties:
  if (planetMoons.hasOwnProperty(planet)) {
    //  ...
  }
}
