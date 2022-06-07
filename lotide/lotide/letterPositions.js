const letterPositions = function (sentence) {
  const results = {}; // Empty object to hold the indices for each letter as an array

  // Loop through each character of the sentence
  for (let i = 0; i < sentence.length; i++) {
    const character = sentence[i];

    // Check to see if the current character property exists
    if (results[character]) {
      results[character].push(i); // If so, push() the current index into the array
    } else {
      // If it doesn't exist and is not a space, create a new property array to hold the indices
      if (character !== " ") {
        results[character] = new Array();
        results[character].push(i);
      }
    }
  }
  return results;
};

console.log(letterPositions("I am a great guy"));
