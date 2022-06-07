// Write a program that takes a single parameter from the command line

const diceNumber = process.argv[2];
// Initialize diceResult
const diceResult = [];
// Create a loop from 0 to dice number
for (let index = 0; index < diceNumber; index++) {
  // For each number in the loop, roll a dice
  console.log(Math.floor(Math.random() * 6) + 1);
  // Add result to diceResult
  diceResult.push(Math.floor(Math.random() * 6) + 1);
}

console.log("Rolled " + diceNumber + " dice: ", diceResult.join(", "));
