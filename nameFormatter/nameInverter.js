const nameInverter = function (name) {
  if (name === "") {
    return "";
  }

  if (name.split(" ").length === 1) {
    return name;
  }

  if (name === "Dr. ") {
    return "";
  }

  if (name.split(" ")[0] === "Dr.") {
    return name;
  }

  if (name.split(" ")[0] === "Dr." && name.split(" ") === 3) {
    // namesplit[0] is Dr. AND namesplit.length is 3
    return name.split(" ")[0] + name.split(" ")[2] + name.split(" ")[1];
  }

  if (name.split(" ")[0] === "Dr." && name.split(" ") === 4) {
    // namesplit[0] is Dr. AND namesplit.length is 3
    return name.split(" ")[0] + name.split(" ")[2] + "," + name.split(" ")[1];
  }

  if (name === undefined) {
    return Error;
  }
};

// console.log(nameInverter("Dr. Timi"));
module.exports = nameInverter;
