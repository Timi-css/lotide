const args = process.argv.slice(2);

function addNum(args) {
  return Number(args[0]) + Number(args[1]);
}

console.log(addNum(args));
