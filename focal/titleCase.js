// const titleCase = function (text) {
//   let words = [];

//   for (const t of text) {
//     const firstLetter = text[0];
//     words.push(firstLetter.toUpperCase(text));
//   }
//   return words;
// };

const titleCase = function (text) {
  const lower = text.toLowerCase();
  const split = lower.split(" ");

  const newArray = [];
  for (let i = 0; i < split.length; i++) {
    let result = "";
    for (let j = 0; j < split[i].length; j++) {
      if (split[i][j] !== "") {
        if (j === 0) {
          result = split[i][j].toUpperCase();
        } else {
          result += split[i][j];
        }
      }
    }

    newArray.push(result);
    // console.log(split[i][0].toUpperCase());
  }
  return newArray.join(" ");
};

console.log(titleCase("hello, i am here"));
console.log(titleCase("WHAT HAPPENS HERE"));
console.log(titleCase("this is an example")); //should return "This Is An Example"
console.log(titleCase("test")); //should return "Test"
console.log(titleCase("i r cool")); //should return "I R Cool"
console.log(titleCase("WHAT HAPPENS HERE")); //should return "What Happens Here"
console.log(titleCase("")); //should return ""
console.log(titleCase("A")); //should return "A"
